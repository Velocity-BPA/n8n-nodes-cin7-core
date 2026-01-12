/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
	cin7CoreApiRequest,
	cin7CoreApiRequestAllItems,
	buildQueryFromFields,
	validateGuid,
	buildLineItems,
} from './transport';

import {
	productOperations,
	productFields,
} from './descriptions/ProductDescription';
import {
	saleOperations,
	saleFields,
} from './descriptions/SaleDescription';
import {
	purchaseOperations,
	purchaseFields,
} from './descriptions/PurchaseDescription';
import {
	customerOperations,
	customerFields,
} from './descriptions/CustomerDescription';
import {
	supplierOperations,
	supplierFields,
} from './descriptions/SupplierDescription';
import {
	stockTransferOperations,
	stockTransferFields,
} from './descriptions/StockTransferDescription';
import {
	stockAdjustmentOperations,
	stockAdjustmentFields,
} from './descriptions/StockAdjustmentDescription';
import {
	locationOperations,
	locationFields,
} from './descriptions/LocationDescription';
import {
	bomOperations,
	bomFields,
} from './descriptions/BomDescription';
import {
	priceTierOperations,
	priceTierFields,
} from './descriptions/PriceTierDescription';
import {
	chartOfAccountsOperations,
	chartOfAccountsFields,
} from './descriptions/ChartOfAccountsDescription';
import {
	paymentTermOperations,
	paymentTermFields,
} from './descriptions/PaymentTermDescription';

export class Cin7Core implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Cin7 Core',
		name: 'cin7Core',
		icon: 'file:cin7core.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Cin7 Core API for inventory management',
		defaults: {
			name: 'Cin7 Core',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'cin7CoreApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Bill of Materials',
						value: 'bom',
					},
					{
						name: 'Chart of Accounts',
						value: 'chartOfAccounts',
					},
					{
						name: 'Customer',
						value: 'customer',
					},
					{
						name: 'Location',
						value: 'location',
					},
					{
						name: 'Payment Term',
						value: 'paymentTerm',
					},
					{
						name: 'Price Tier',
						value: 'priceTier',
					},
					{
						name: 'Product',
						value: 'product',
					},
					{
						name: 'Purchase',
						value: 'purchase',
					},
					{
						name: 'Sale',
						value: 'sale',
					},
					{
						name: 'Stock Adjustment',
						value: 'stockAdjustment',
					},
					{
						name: 'Stock Transfer',
						value: 'stockTransfer',
					},
					{
						name: 'Supplier',
						value: 'supplier',
					},
				],
				default: 'product',
			},
			// Operations and fields for each resource
			...productOperations,
			...productFields,
			...saleOperations,
			...saleFields,
			...purchaseOperations,
			...purchaseFields,
			...customerOperations,
			...customerFields,
			...supplierOperations,
			...supplierFields,
			...stockTransferOperations,
			...stockTransferFields,
			...stockAdjustmentOperations,
			...stockAdjustmentFields,
			...locationOperations,
			...locationFields,
			...bomOperations,
			...bomFields,
			...priceTierOperations,
			...priceTierFields,
			...chartOfAccountsOperations,
			...chartOfAccountsFields,
			...paymentTermOperations,
			...paymentTermFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		// Log licensing notice once per execution
		this.logger.warn(
			'[Velocity BPA Licensing Notice] This n8n node is licensed under the Business Source License 1.1 (BSL 1.1). ' +
			'Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA. ' +
			'For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.'
		);

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: IDataObject | IDataObject[] = {};

				// Product operations
				if (resource === 'product') {
					if (operation === 'get') {
						const productId = this.getNodeParameter('productId', i) as string;
						validateGuid(productId, 'Product ID');
						responseData = await cin7CoreApiRequest.call(this, 'GET', `/product`, {}, { ID: productId });
						responseData = (responseData as IDataObject).Products as IDataObject[] || [];
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query = buildQueryFromFields(filters);

						if (returnAll) {
							responseData = await cin7CoreApiRequestAllItems.call(this, 'GET', '/product', 'Products', {}, query);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.Limit = limit;
							const response = await cin7CoreApiRequest.call(this, 'GET', '/product', {}, query);
							responseData = (response as IDataObject).Products as IDataObject[] || [];
						}
					} else if (operation === 'create') {
						const body: IDataObject = {
							SKU: this.getNodeParameter('sku', i) as string,
							Name: this.getNodeParameter('name', i) as string,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, buildQueryFromFields(additionalFields));
						responseData = await cin7CoreApiRequest.call(this, 'POST', '/product', body);
					} else if (operation === 'update') {
						const productId = this.getNodeParameter('productId', i) as string;
						validateGuid(productId, 'Product ID');
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						const body: IDataObject = { ID: productId, ...buildQueryFromFields(updateFields) };
						responseData = await cin7CoreApiRequest.call(this, 'PUT', '/product', body);
					} else if (operation === 'delete') {
						const productId = this.getNodeParameter('productId', i) as string;
						validateGuid(productId, 'Product ID');
						responseData = await cin7CoreApiRequest.call(this, 'DELETE', `/product`, {}, { ID: productId });
					} else if (operation === 'getAvailability') {
						const productId = this.getNodeParameter('productId', i) as string;
						validateGuid(productId, 'Product ID');
						responseData = await cin7CoreApiRequest.call(this, 'GET', '/ref/productavailability', {}, { ProductID: productId });
						responseData = (responseData as IDataObject).ProductAvailabilityList as IDataObject[] || [];
					} else if (operation === 'updatePricing') {
						const productId = this.getNodeParameter('productId', i) as string;
						validateGuid(productId, 'Product ID');
						const pricingData = this.getNodeParameter('pricingData', i) as IDataObject;
						const body: IDataObject = {
							ProductID: productId,
							...pricingData,
						};
						responseData = await cin7CoreApiRequest.call(this, 'PUT', '/product/pricing', body);
					} else if (operation === 'attachFile') {
						const productId = this.getNodeParameter('productId', i) as string;
						validateGuid(productId, 'Product ID');
						const fileName = this.getNodeParameter('fileName', i) as string;
						const fileUrl = this.getNodeParameter('fileUrl', i) as string;
						const body: IDataObject = {
							ProductID: productId,
							FileName: fileName,
							FileURL: fileUrl,
						};
						responseData = await cin7CoreApiRequest.call(this, 'POST', '/product/attachments', body);
					} else if (operation === 'getSuppliers') {
						const productId = this.getNodeParameter('productId', i) as string;
						validateGuid(productId, 'Product ID');
						responseData = await cin7CoreApiRequest.call(this, 'GET', '/product/suppliers', {}, { ProductID: productId });
						responseData = (responseData as IDataObject).ProductSuppliers as IDataObject[] || [];
					} else if (operation === 'addSupplier') {
						const productId = this.getNodeParameter('productId', i) as string;
						validateGuid(productId, 'Product ID');
						const supplierId = this.getNodeParameter('supplierId', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body: IDataObject = {
							ProductID: productId,
							SupplierID: supplierId,
							...buildQueryFromFields(additionalFields),
						};
						responseData = await cin7CoreApiRequest.call(this, 'POST', '/product/suppliers', body);
					}
				}

				// Sale operations
				else if (resource === 'sale') {
					if (operation === 'get') {
						const saleId = this.getNodeParameter('saleId', i) as string;
						responseData = await cin7CoreApiRequest.call(this, 'GET', '/sale', {}, { ID: saleId });
						responseData = (responseData as IDataObject).SaleList as IDataObject[] || [];
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query = buildQueryFromFields(filters);

						if (returnAll) {
							responseData = await cin7CoreApiRequestAllItems.call(this, 'GET', '/sale/list', 'SaleList', {}, query);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.Limit = limit;
							const response = await cin7CoreApiRequest.call(this, 'GET', '/sale/list', {}, query);
							responseData = (response as IDataObject).SaleList as IDataObject[] || [];
						}
					} else if (operation === 'create') {
						const customer = this.getNodeParameter('customer', i) as string;
						const lines = this.getNodeParameter('lines.lineItems', i, []) as IDataObject[];
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body: IDataObject = {
							Customer: customer,
							Lines: buildLineItems(lines, ['ProductID', 'Quantity']),
							...buildQueryFromFields(additionalFields),
						};
						responseData = await cin7CoreApiRequest.call(this, 'POST', '/sale', body);
					} else if (operation === 'update') {
						const saleId = this.getNodeParameter('saleId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						const body: IDataObject = { ID: saleId, ...buildQueryFromFields(updateFields) };
						responseData = await cin7CoreApiRequest.call(this, 'PUT', '/sale', body);
					} else if (operation === 'void') {
						const saleId = this.getNodeParameter('saleId', i) as string;
						responseData = await cin7CoreApiRequest.call(this, 'POST', '/sale/void', { SaleID: saleId });
					} else if (operation === 'undo') {
						const saleId = this.getNodeParameter('saleId', i) as string;
						responseData = await cin7CoreApiRequest.call(this, 'POST', '/sale/undo', { SaleID: saleId });
					} else if (operation === 'pick') {
						const saleId = this.getNodeParameter('saleId', i) as string;
						const pickData = this.getNodeParameter('pickData', i, {}) as IDataObject;
						const body: IDataObject = { SaleID: saleId, ...pickData };
						responseData = await cin7CoreApiRequest.call(this, 'POST', '/sale/pick', body);
					} else if (operation === 'pack') {
						const saleId = this.getNodeParameter('saleId', i) as string;
						const packData = this.getNodeParameter('packData', i, {}) as IDataObject;
						const body: IDataObject = { SaleID: saleId, ...packData };
						responseData = await cin7CoreApiRequest.call(this, 'POST', '/sale/pack', body);
					} else if (operation === 'ship') {
						const saleId = this.getNodeParameter('saleId', i) as string;
						const shipData = this.getNodeParameter('shipData', i, {}) as IDataObject;
						const body: IDataObject = { SaleID: saleId, ...shipData };
						responseData = await cin7CoreApiRequest.call(this, 'POST', '/sale/ship', body);
					} else if (operation === 'createInvoice') {
						const saleId = this.getNodeParameter('saleId', i) as string;
						const invoiceData = this.getNodeParameter('invoiceData', i, {}) as IDataObject;
						const body: IDataObject = { SaleID: saleId, ...invoiceData };
						responseData = await cin7CoreApiRequest.call(this, 'POST', '/sale/invoice', body);
					} else if (operation === 'addPayment') {
						const saleId = this.getNodeParameter('saleId', i) as string;
						const amount = this.getNodeParameter('amount', i) as number;
						const paymentMethod = this.getNodeParameter('paymentMethod', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body: IDataObject = {
							SaleID: saleId,
							Amount: amount,
							PaymentMethod: paymentMethod,
							...buildQueryFromFields(additionalFields),
						};
						responseData = await cin7CoreApiRequest.call(this, 'POST', '/sale/payment', body);
					}
				}

				// Purchase operations
				else if (resource === 'purchase') {
					if (operation === 'get') {
						const purchaseId = this.getNodeParameter('purchaseId', i) as string;
						responseData = await cin7CoreApiRequest.call(this, 'GET', '/purchase', {}, { ID: purchaseId });
						responseData = (responseData as IDataObject).PurchaseList as IDataObject[] || [];
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query = buildQueryFromFields(filters);

						if (returnAll) {
							responseData = await cin7CoreApiRequestAllItems.call(this, 'GET', '/purchase/list', 'PurchaseList', {}, query);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.Limit = limit;
							const response = await cin7CoreApiRequest.call(this, 'GET', '/purchase/list', {}, query);
							responseData = (response as IDataObject).PurchaseList as IDataObject[] || [];
						}
					} else if (operation === 'create') {
						const supplier = this.getNodeParameter('supplier', i) as string;
						const lines = this.getNodeParameter('lines.lineItems', i, []) as IDataObject[];
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body: IDataObject = {
							Supplier: supplier,
							Lines: buildLineItems(lines, ['ProductID', 'Quantity']),
							...buildQueryFromFields(additionalFields),
						};
						responseData = await cin7CoreApiRequest.call(this, 'POST', '/purchase', body);
					} else if (operation === 'update') {
						const purchaseId = this.getNodeParameter('purchaseId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						const body: IDataObject = { ID: purchaseId, ...buildQueryFromFields(updateFields) };
						responseData = await cin7CoreApiRequest.call(this, 'PUT', '/purchase', body);
					} else if (operation === 'delete') {
						const purchaseId = this.getNodeParameter('purchaseId', i) as string;
						responseData = await cin7CoreApiRequest.call(this, 'DELETE', '/purchase', {}, { ID: purchaseId });
					} else if (operation === 'authorize') {
						const purchaseId = this.getNodeParameter('purchaseId', i) as string;
						responseData = await cin7CoreApiRequest.call(this, 'POST', '/purchase/authorize', { PurchaseID: purchaseId });
					} else if (operation === 'receive') {
						const purchaseId = this.getNodeParameter('purchaseId', i) as string;
						const receiveData = this.getNodeParameter('receiveData', i, {}) as IDataObject;
						const body: IDataObject = { PurchaseID: purchaseId, ...receiveData };
						responseData = await cin7CoreApiRequest.call(this, 'POST', '/purchase/stock', body);
					} else if (operation === 'addCost') {
						const purchaseId = this.getNodeParameter('purchaseId', i) as string;
						const costData = this.getNodeParameter('costData', i) as IDataObject;
						const body: IDataObject = { PurchaseID: purchaseId, ...costData };
						responseData = await cin7CoreApiRequest.call(this, 'POST', '/purchase/additionalcost', body);
					} else if (operation === 'createCreditNote') {
						const purchaseId = this.getNodeParameter('purchaseId', i) as string;
						const creditNoteData = this.getNodeParameter('creditNoteData', i, {}) as IDataObject;
						const body: IDataObject = { PurchaseID: purchaseId, ...creditNoteData };
						responseData = await cin7CoreApiRequest.call(this, 'POST', '/purchase/creditnote', body);
					} else if (operation === 'invoice') {
						const purchaseId = this.getNodeParameter('purchaseId', i) as string;
						const invoiceData = this.getNodeParameter('invoiceData', i, {}) as IDataObject;
						const body: IDataObject = { PurchaseID: purchaseId, ...invoiceData };
						responseData = await cin7CoreApiRequest.call(this, 'POST', '/purchase/invoice', body);
					}
				}

				// Customer operations
				else if (resource === 'customer') {
					if (operation === 'get') {
						const customerId = this.getNodeParameter('customerId', i) as string;
						responseData = await cin7CoreApiRequest.call(this, 'GET', '/customer', {}, { ID: customerId });
						responseData = (responseData as IDataObject).CustomerList as IDataObject[] || [];
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query = buildQueryFromFields(filters);

						if (returnAll) {
							responseData = await cin7CoreApiRequestAllItems.call(this, 'GET', '/customer', 'CustomerList', {}, query);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.Limit = limit;
							const response = await cin7CoreApiRequest.call(this, 'GET', '/customer', {}, query);
							responseData = (response as IDataObject).CustomerList as IDataObject[] || [];
						}
					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body: IDataObject = {
							Name: name,
							...buildQueryFromFields(additionalFields),
						};
						responseData = await cin7CoreApiRequest.call(this, 'POST', '/customer', body);
					} else if (operation === 'update') {
						const customerId = this.getNodeParameter('customerId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						const body: IDataObject = { ID: customerId, ...buildQueryFromFields(updateFields) };
						responseData = await cin7CoreApiRequest.call(this, 'PUT', '/customer', body);
					} else if (operation === 'delete') {
						const customerId = this.getNodeParameter('customerId', i) as string;
						responseData = await cin7CoreApiRequest.call(this, 'DELETE', '/customer', {}, { ID: customerId });
					} else if (operation === 'getContacts') {
						const customerId = this.getNodeParameter('customerId', i) as string;
						responseData = await cin7CoreApiRequest.call(this, 'GET', '/customer/contacts', {}, { CustomerID: customerId });
						responseData = (responseData as IDataObject).ContactList as IDataObject[] || [];
					} else if (operation === 'addContact') {
						const customerId = this.getNodeParameter('customerId', i) as string;
						const contactName = this.getNodeParameter('contactName', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body: IDataObject = {
							CustomerID: customerId,
							Name: contactName,
							...buildQueryFromFields(additionalFields),
						};
						responseData = await cin7CoreApiRequest.call(this, 'POST', '/customer/contacts', body);
					} else if (operation === 'getAddresses') {
						const customerId = this.getNodeParameter('customerId', i) as string;
						responseData = await cin7CoreApiRequest.call(this, 'GET', '/customer/addresses', {}, { CustomerID: customerId });
						responseData = (responseData as IDataObject).AddressList as IDataObject[] || [];
					} else if (operation === 'addAddress') {
						const customerId = this.getNodeParameter('customerId', i) as string;
						const addressLine1 = this.getNodeParameter('addressLine1', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body: IDataObject = {
							CustomerID: customerId,
							AddressLine1: addressLine1,
							...buildQueryFromFields(additionalFields),
						};
						responseData = await cin7CoreApiRequest.call(this, 'POST', '/customer/addresses', body);
					}
				}

				// Supplier operations
				else if (resource === 'supplier') {
					if (operation === 'get') {
						const supplierId = this.getNodeParameter('supplierId', i) as string;
						responseData = await cin7CoreApiRequest.call(this, 'GET', '/supplier', {}, { ID: supplierId });
						responseData = (responseData as IDataObject).SupplierList as IDataObject[] || [];
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query = buildQueryFromFields(filters);

						if (returnAll) {
							responseData = await cin7CoreApiRequestAllItems.call(this, 'GET', '/supplier', 'SupplierList', {}, query);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.Limit = limit;
							const response = await cin7CoreApiRequest.call(this, 'GET', '/supplier', {}, query);
							responseData = (response as IDataObject).SupplierList as IDataObject[] || [];
						}
					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body: IDataObject = {
							Name: name,
							...buildQueryFromFields(additionalFields),
						};
						responseData = await cin7CoreApiRequest.call(this, 'POST', '/supplier', body);
					} else if (operation === 'update') {
						const supplierId = this.getNodeParameter('supplierId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						const body: IDataObject = { ID: supplierId, ...buildQueryFromFields(updateFields) };
						responseData = await cin7CoreApiRequest.call(this, 'PUT', '/supplier', body);
					} else if (operation === 'delete') {
						const supplierId = this.getNodeParameter('supplierId', i) as string;
						responseData = await cin7CoreApiRequest.call(this, 'DELETE', '/supplier', {}, { ID: supplierId });
					} else if (operation === 'getContacts') {
						const supplierId = this.getNodeParameter('supplierId', i) as string;
						responseData = await cin7CoreApiRequest.call(this, 'GET', '/supplier/contacts', {}, { SupplierID: supplierId });
						responseData = (responseData as IDataObject).ContactList as IDataObject[] || [];
					} else if (operation === 'addContact') {
						const supplierId = this.getNodeParameter('supplierId', i) as string;
						const contactName = this.getNodeParameter('contactName', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body: IDataObject = {
							SupplierID: supplierId,
							Name: contactName,
							...buildQueryFromFields(additionalFields),
						};
						responseData = await cin7CoreApiRequest.call(this, 'POST', '/supplier/contacts', body);
					} else if (operation === 'getProducts') {
						const supplierId = this.getNodeParameter('supplierId', i) as string;
						responseData = await cin7CoreApiRequest.call(this, 'GET', '/supplier/products', {}, { SupplierID: supplierId });
						responseData = (responseData as IDataObject).ProductList as IDataObject[] || [];
					}
				}

				// Stock Transfer operations
				else if (resource === 'stockTransfer') {
					if (operation === 'get') {
						const stockTransferId = this.getNodeParameter('stockTransferId', i) as string;
						responseData = await cin7CoreApiRequest.call(this, 'GET', '/stocktransfer', {}, { ID: stockTransferId });
						responseData = (responseData as IDataObject).StockTransferList as IDataObject[] || [];
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query = buildQueryFromFields(filters);

						if (returnAll) {
							responseData = await cin7CoreApiRequestAllItems.call(this, 'GET', '/stocktransfer/list', 'StockTransferList', {}, query);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.Limit = limit;
							const response = await cin7CoreApiRequest.call(this, 'GET', '/stocktransfer/list', {}, query);
							responseData = (response as IDataObject).StockTransferList as IDataObject[] || [];
						}
					} else if (operation === 'create') {
						const fromLocation = this.getNodeParameter('fromLocation', i) as string;
						const toLocation = this.getNodeParameter('toLocation', i) as string;
						const lines = this.getNodeParameter('lines.lineItems', i, []) as IDataObject[];
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body: IDataObject = {
							FromLocation: fromLocation,
							ToLocation: toLocation,
							Lines: buildLineItems(lines, ['ProductID', 'Quantity']),
							...buildQueryFromFields(additionalFields),
						};
						responseData = await cin7CoreApiRequest.call(this, 'POST', '/stocktransfer', body);
					} else if (operation === 'update') {
						const stockTransferId = this.getNodeParameter('stockTransferId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						const body: IDataObject = { ID: stockTransferId, ...buildQueryFromFields(updateFields) };
						responseData = await cin7CoreApiRequest.call(this, 'PUT', '/stocktransfer', body);
					} else if (operation === 'authorize') {
						const stockTransferId = this.getNodeParameter('stockTransferId', i) as string;
						responseData = await cin7CoreApiRequest.call(this, 'POST', '/stocktransfer/authorize', { StockTransferID: stockTransferId });
					} else if (operation === 'pick') {
						const stockTransferId = this.getNodeParameter('stockTransferId', i) as string;
						const pickData = this.getNodeParameter('pickData', i, {}) as IDataObject;
						const body: IDataObject = { StockTransferID: stockTransferId, ...pickData };
						responseData = await cin7CoreApiRequest.call(this, 'POST', '/stocktransfer/pick', body);
					} else if (operation === 'complete') {
						const stockTransferId = this.getNodeParameter('stockTransferId', i) as string;
						responseData = await cin7CoreApiRequest.call(this, 'POST', '/stocktransfer/complete', { StockTransferID: stockTransferId });
					} else if (operation === 'void') {
						const stockTransferId = this.getNodeParameter('stockTransferId', i) as string;
						responseData = await cin7CoreApiRequest.call(this, 'POST', '/stocktransfer/void', { StockTransferID: stockTransferId });
					}
				}

				// Stock Adjustment operations
				else if (resource === 'stockAdjustment') {
					if (operation === 'get') {
						const stockAdjustmentId = this.getNodeParameter('stockAdjustmentId', i) as string;
						responseData = await cin7CoreApiRequest.call(this, 'GET', '/stockadjustment', {}, { ID: stockAdjustmentId });
						responseData = (responseData as IDataObject).StockAdjustmentList as IDataObject[] || [];
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query = buildQueryFromFields(filters);

						if (returnAll) {
							responseData = await cin7CoreApiRequestAllItems.call(this, 'GET', '/stockadjustment/list', 'StockAdjustmentList', {}, query);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.Limit = limit;
							const response = await cin7CoreApiRequest.call(this, 'GET', '/stockadjustment/list', {}, query);
							responseData = (response as IDataObject).StockAdjustmentList as IDataObject[] || [];
						}
					} else if (operation === 'create') {
						const location = this.getNodeParameter('location', i) as string;
						const lines = this.getNodeParameter('lines.lineItems', i, []) as IDataObject[];
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body: IDataObject = {
							Location: location,
							Lines: buildLineItems(lines, ['ProductID', 'Quantity']),
							...buildQueryFromFields(additionalFields),
						};
						responseData = await cin7CoreApiRequest.call(this, 'POST', '/stockadjustment', body);
					} else if (operation === 'authorize') {
						const stockAdjustmentId = this.getNodeParameter('stockAdjustmentId', i) as string;
						responseData = await cin7CoreApiRequest.call(this, 'POST', '/stockadjustment/authorize', { StockAdjustmentID: stockAdjustmentId });
					} else if (operation === 'void') {
						const stockAdjustmentId = this.getNodeParameter('stockAdjustmentId', i) as string;
						responseData = await cin7CoreApiRequest.call(this, 'POST', '/stockadjustment/void', { StockAdjustmentID: stockAdjustmentId });
					}
				}

				// Location operations
				else if (resource === 'location') {
					if (operation === 'get') {
						const locationId = this.getNodeParameter('locationId', i) as string;
						responseData = await cin7CoreApiRequest.call(this, 'GET', '/ref/location', {}, { ID: locationId });
						responseData = (responseData as IDataObject).LocationList as IDataObject[] || [];
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query = buildQueryFromFields(filters);

						if (returnAll) {
							responseData = await cin7CoreApiRequestAllItems.call(this, 'GET', '/ref/location', 'LocationList', {}, query);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.Limit = limit;
							const response = await cin7CoreApiRequest.call(this, 'GET', '/ref/location', {}, query);
							responseData = (response as IDataObject).LocationList as IDataObject[] || [];
						}
					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body: IDataObject = {
							Name: name,
							...buildQueryFromFields(additionalFields),
						};
						responseData = await cin7CoreApiRequest.call(this, 'POST', '/ref/location', body);
					} else if (operation === 'update') {
						const locationId = this.getNodeParameter('locationId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						const body: IDataObject = { ID: locationId, ...buildQueryFromFields(updateFields) };
						responseData = await cin7CoreApiRequest.call(this, 'PUT', '/ref/location', body);
					} else if (operation === 'delete') {
						const locationId = this.getNodeParameter('locationId', i) as string;
						responseData = await cin7CoreApiRequest.call(this, 'DELETE', '/ref/location', {}, { ID: locationId });
					} else if (operation === 'getStock') {
						const locationId = this.getNodeParameter('locationId', i) as string;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query = buildQueryFromFields(filters);
						query.LocationID = locationId;
						responseData = await cin7CoreApiRequest.call(this, 'GET', '/ref/productavailability', {}, query);
						responseData = (responseData as IDataObject).ProductAvailabilityList as IDataObject[] || [];
					}
				}

				// BOM operations
				else if (resource === 'bom') {
					if (operation === 'get') {
						const productId = this.getNodeParameter('productId', i) as string;
						validateGuid(productId, 'Product ID');
						responseData = await cin7CoreApiRequest.call(this, 'GET', '/bom', {}, { ProductID: productId });
						responseData = (responseData as IDataObject).BOM as IDataObject || {};
					} else if (operation === 'create') {
						const productId = this.getNodeParameter('productId', i) as string;
						validateGuid(productId, 'Product ID');
						const components = this.getNodeParameter('components.componentItems', i, []) as IDataObject[];
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body: IDataObject = {
							ProductID: productId,
							Components: buildLineItems(components, ['ComponentProductID', 'Quantity']),
							...buildQueryFromFields(additionalFields),
						};
						responseData = await cin7CoreApiRequest.call(this, 'POST', '/bom', body);
					} else if (operation === 'update') {
						const productId = this.getNodeParameter('productId', i) as string;
						validateGuid(productId, 'Product ID');
						const components = this.getNodeParameter('components.componentItems', i, []) as IDataObject[];
						const body: IDataObject = {
							ProductID: productId,
							Components: buildLineItems(components, ['ComponentProductID', 'Quantity']),
						};
						responseData = await cin7CoreApiRequest.call(this, 'PUT', '/bom', body);
					} else if (operation === 'delete') {
						const productId = this.getNodeParameter('productId', i) as string;
						validateGuid(productId, 'Product ID');
						responseData = await cin7CoreApiRequest.call(this, 'DELETE', '/bom', {}, { ProductID: productId });
					} else if (operation === 'getComponents') {
						const productId = this.getNodeParameter('productId', i) as string;
						validateGuid(productId, 'Product ID');
						const response = await cin7CoreApiRequest.call(this, 'GET', '/bom', {}, { ProductID: productId });
						responseData = (response as IDataObject).Components as IDataObject[] || [];
					} else if (operation === 'addComponent') {
						const productId = this.getNodeParameter('productId', i) as string;
						validateGuid(productId, 'Product ID');
						const componentProductId = this.getNodeParameter('componentProductId', i) as string;
						const quantity = this.getNodeParameter('quantity', i) as number;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body: IDataObject = {
							ProductID: productId,
							Components: [{
								ComponentProductID: componentProductId,
								Quantity: quantity,
								...buildQueryFromFields(additionalFields),
							}],
						};
						responseData = await cin7CoreApiRequest.call(this, 'POST', '/bom/component', body);
					}
				}

				// Price Tier operations
				else if (resource === 'priceTier') {
					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await cin7CoreApiRequestAllItems.call(this, 'GET', '/ref/pricetier', 'PriceTierList', {}, {});
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await cin7CoreApiRequest.call(this, 'GET', '/ref/pricetier', {}, { Limit: limit });
							responseData = (response as IDataObject).PriceTierList as IDataObject[] || [];
						}
					} else if (operation === 'getPrices') {
						const priceTierName = this.getNodeParameter('priceTierName', i) as string;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query = buildQueryFromFields(filters);
						query.PriceTier = priceTierName;
						responseData = await cin7CoreApiRequest.call(this, 'GET', '/ref/productprice', {}, query);
						responseData = (responseData as IDataObject).ProductPriceList as IDataObject[] || [];
					} else if (operation === 'updatePrice') {
						const priceTierName = this.getNodeParameter('priceTierName', i) as string;
						const productId = this.getNodeParameter('productId', i) as string;
						const price = this.getNodeParameter('price', i) as number;
						const body: IDataObject = {
							PriceTier: priceTierName,
							ProductID: productId,
							Price: price,
						};
						responseData = await cin7CoreApiRequest.call(this, 'PUT', '/ref/productprice', body);
					}
				}

				// Chart of Accounts operations
				else if (resource === 'chartOfAccounts') {
					if (operation === 'get') {
						const accountCode = this.getNodeParameter('accountCode', i) as string;
						responseData = await cin7CoreApiRequest.call(this, 'GET', '/ref/account', {}, { Code: accountCode });
						responseData = (responseData as IDataObject).AccountList as IDataObject[] || [];
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query = buildQueryFromFields(filters);

						if (returnAll) {
							responseData = await cin7CoreApiRequestAllItems.call(this, 'GET', '/ref/account', 'AccountList', {}, query);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.Limit = limit;
							const response = await cin7CoreApiRequest.call(this, 'GET', '/ref/account', {}, query);
							responseData = (response as IDataObject).AccountList as IDataObject[] || [];
						}
					}
				}

				// Payment Term operations
				else if (resource === 'paymentTerm') {
					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await cin7CoreApiRequestAllItems.call(this, 'GET', '/ref/paymentterm', 'PaymentTermList', {}, {});
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await cin7CoreApiRequest.call(this, 'GET', '/ref/paymentterm', {}, { Limit: limit });
							responseData = (response as IDataObject).PaymentTermList as IDataObject[] || [];
						}
					}
				}

				// Process response data
				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData as IDataObject[]),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message }, pairedItem: { item: i } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
