/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IPollFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import { cin7CoreApiRequestAllItems } from './transport';

export class Cin7CoreTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Cin7 Core Trigger',
		name: 'cin7CoreTrigger',
		icon: 'file:cin7core.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["event"]}}',
		description: 'Triggers when Cin7 Core events occur',
		defaults: {
			name: 'Cin7 Core Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'cin7CoreApi',
				required: true,
			},
		],
		polling: true,
		properties: [
			{
				displayName: 'Event',
				name: 'event',
				type: 'options',
				required: true,
				default: 'saleCreated',
				options: [
					{
						name: 'Customer Created',
						value: 'customerCreated',
						description: 'Triggers when a new customer is created',
					},
					{
						name: 'Customer Updated',
						value: 'customerUpdated',
						description: 'Triggers when a customer is updated',
					},
					{
						name: 'Product Created',
						value: 'productCreated',
						description: 'Triggers when a new product is created',
					},
					{
						name: 'Product Stock Changed',
						value: 'productStockChanged',
						description: 'Triggers when product stock levels change',
					},
					{
						name: 'Product Updated',
						value: 'productUpdated',
						description: 'Triggers when a product is updated',
					},
					{
						name: 'Purchase Created',
						value: 'purchaseCreated',
						description: 'Triggers when a new purchase order is created',
					},
					{
						name: 'Purchase Received',
						value: 'purchaseReceived',
						description: 'Triggers when a purchase order is received',
					},
					{
						name: 'Purchase Updated',
						value: 'purchaseUpdated',
						description: 'Triggers when a purchase order is updated',
					},
					{
						name: 'Sale Created',
						value: 'saleCreated',
						description: 'Triggers when a new sale is created',
					},
					{
						name: 'Sale Shipped',
						value: 'saleShipped',
						description: 'Triggers when a sale is shipped',
					},
					{
						name: 'Sale Updated',
						value: 'saleUpdated',
						description: 'Triggers when a sale is updated',
					},
					{
						name: 'Stock Transfer Completed',
						value: 'stockTransferCompleted',
						description: 'Triggers when a stock transfer is completed',
					},
					{
						name: 'Stock Transfer Created',
						value: 'stockTransferCreated',
						description: 'Triggers when a new stock transfer is created',
					},
				],
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Location',
						name: 'location',
						type: 'string',
						default: '',
						description: 'Filter by location name',
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'string',
						default: '',
						description: 'Filter by status',
					},
				],
			},
		],
	};

	async poll(this: IPollFunctions): Promise<INodeExecutionData[][] | null> {
		const event = this.getNodeParameter('event') as string;
		const options = this.getNodeParameter('options') as IDataObject;
		const webhookData = this.getWorkflowStaticData('node');

		// Log licensing notice
		this.logger.warn(
			'[Velocity BPA Licensing Notice] This n8n node is licensed under the Business Source License 1.1 (BSL 1.1). ' +
			'Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA. ' +
			'For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.'
		);

		// Get the last poll time or use a default
		const lastPollTime = webhookData.lastPollTime as string || new Date(Date.now() - 60000).toISOString();
		const currentTime = new Date().toISOString();

		let endpoint = '';
		let propertyName = '';
		let statusFilter = '';

		// Map events to endpoints and property names
		switch (event) {
			case 'saleCreated':
			case 'saleUpdated':
				endpoint = '/sale/list';
				propertyName = 'SaleList';
				break;
			case 'saleShipped':
				endpoint = '/sale/list';
				propertyName = 'SaleList';
				statusFilter = 'Shipped';
				break;
			case 'purchaseCreated':
			case 'purchaseUpdated':
				endpoint = '/purchase/list';
				propertyName = 'PurchaseList';
				break;
			case 'purchaseReceived':
				endpoint = '/purchase/list';
				propertyName = 'PurchaseList';
				statusFilter = 'Received';
				break;
			case 'productCreated':
			case 'productUpdated':
				endpoint = '/product';
				propertyName = 'Products';
				break;
			case 'productStockChanged':
				endpoint = '/ref/productavailability';
				propertyName = 'ProductAvailabilityList';
				break;
			case 'customerCreated':
			case 'customerUpdated':
				endpoint = '/customer';
				propertyName = 'CustomerList';
				break;
			case 'stockTransferCreated':
				endpoint = '/stocktransfer/list';
				propertyName = 'StockTransferList';
				break;
			case 'stockTransferCompleted':
				endpoint = '/stocktransfer/list';
				propertyName = 'StockTransferList';
				statusFilter = 'Completed';
				break;
			default:
				throw new Error(`Unsupported event: ${event}`);
		}

		// Build query parameters
		const query: IDataObject = {
			ModifiedSince: lastPollTime,
		};

		if (statusFilter) {
			query.Status = statusFilter;
		}

		if (options.location) {
			query.Location = options.location;
		}

		if (options.status && !statusFilter) {
			query.Status = options.status;
		}

		try {
			// Fetch modified records
			const responseData = await cin7CoreApiRequestAllItems.call(
				this,
				'GET',
				endpoint,
				propertyName,
				{},
				query,
			);

			// Update last poll time
			webhookData.lastPollTime = currentTime;

			// If no records, return null
			if (!responseData || responseData.length === 0) {
				return null;
			}

			// Filter for created vs updated events
			let filteredData = responseData;

			if (event.endsWith('Created')) {
				// For created events, filter records created after last poll
				filteredData = responseData.filter((item: IDataObject) => {
					const createdDate = item.CreatedDate as string || item.OrderDate as string || item.TransferDate as string;
					return createdDate && new Date(createdDate) >= new Date(lastPollTime);
				});
			}

			if (filteredData.length === 0) {
				return null;
			}

			// Return the results
			return [this.helpers.returnJsonArray(filteredData)];
		} catch (error) {
			throw new Error(`Cin7 Core Trigger Error: ${(error as Error).message}`);
		}
	}
}
