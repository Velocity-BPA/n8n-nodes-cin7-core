/**
 * Copyright (c) 2026 Velocity BPA
 * 
 * Licensed under the Business Source License 1.1 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     https://github.com/VelocityBPA/n8n-nodes-cin7core/blob/main/LICENSE
 * 
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
  NodeApiError,
} from 'n8n-workflow';

export class Cin7Core implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Cin7 Core',
    name: 'cin7core',
    icon: 'file:cin7core.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with the Cin7 Core API',
    defaults: {
      name: 'Cin7 Core',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'cin7coreApi',
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
            name: 'Product',
            value: 'product',
          },
          {
            name: 'Sale',
            value: 'sale',
          },
          {
            name: 'Purchase',
            value: 'purchase',
          },
          {
            name: 'Customer',
            value: 'customer',
          },
          {
            name: 'Supplier',
            value: 'supplier',
          },
          {
            name: 'StockTransfer',
            value: 'stockTransfer',
          },
          {
            name: 'Location',
            value: 'location',
          }
        ],
        default: 'product',
      },
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: { resource: ['product'] } },
	options: [
		{
			name: 'Get All',
			value: 'getAll',
			description: 'List all products',
			action: 'Get all products',
		},
		{
			name: 'Get',
			value: 'get',
			description: 'Get a specific product by ID',
			action: 'Get a product',
		},
		{
			name: 'Create',
			value: 'create',
			description: 'Create a new product',
			action: 'Create a product',
		},
		{
			name: 'Update',
			value: 'update',
			description: 'Update an existing product',
			action: 'Update a product',
		},
		{
			name: 'Delete',
			value: 'delete',
			description: 'Delete a product',
			action: 'Delete a product',
		},
	],
	default: 'getAll',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['sale'],
		},
	},
	options: [
		{
			name: 'Get All Sales',
			value: 'getAll',
			description: 'List all sales orders, quotes, and invoices',
			action: 'Get all sales',
		},
		{
			name: 'Get Sale',
			value: 'get',
			description: 'Get a specific sale by ID',
			action: 'Get a sale',
		},
		{
			name: 'Create Quote',
			value: 'createQuote',
			description: 'Create a new sales quote',
			action: 'Create a quote',
		},
		{
			name: 'Create Order',
			value: 'createOrder',
			description: 'Create a new sales order',
			action: 'Create an order',
		},
		{
			name: 'Update Sale',
			value: 'update',
			description: 'Update an existing sale',
			action: 'Update a sale',
		},
		{
			name: 'Void Sale',
			value: 'void',
			description: 'Void a sales order',
			action: 'Void a sale',
		},
	],
	default: 'getAll',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: { resource: ['purchase'] } },
	options: [
		{
			name: 'Get All',
			value: 'getAll',
			description: 'List all purchases',
			action: 'Get all purchases',
		},
		{
			name: 'Get',
			value: 'get',
			description: 'Get specific purchase by ID',
			action: 'Get a purchase',
		},
		{
			name: 'Create',
			value: 'create',
			description: 'Create purchase order',
			action: 'Create a purchase',
		},
		{
			name: 'Update',
			value: 'update',
			description: 'Update purchase order',
			action: 'Update a purchase',
		},
		{
			name: 'Authorise',
			value: 'authorise',
			description: 'Authorise purchase order',
			action: 'Authorise a purchase',
		},
		{
			name: 'Void',
			value: 'void',
			description: 'Void purchase order',
			action: 'Void a purchase',
		},
	],
	default: 'getAll',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['customer'] } },
  options: [
    { name: 'Get All', value: 'getAll', description: 'List all customers', action: 'Get all customers' },
    { name: 'Get', value: 'get', description: 'Get specific customer by ID', action: 'Get a customer' },
    { name: 'Create', value: 'create', description: 'Create new customer', action: 'Create a customer' },
    { name: 'Update', value: 'update', description: 'Update existing customer', action: 'Update a customer' },
    { name: 'Delete', value: 'delete', description: 'Delete customer', action: 'Delete a customer' }
  ],
  default: 'getAll',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['supplier'] } },
  options: [
    { name: 'Get All', value: 'getAll', description: 'List all suppliers', action: 'Get all suppliers' },
    { name: 'Get', value: 'get', description: 'Get specific supplier by ID', action: 'Get a supplier' },
    { name: 'Create', value: 'create', description: 'Create new supplier', action: 'Create a supplier' },
    { name: 'Update', value: 'update', description: 'Update existing supplier', action: 'Update a supplier' },
    { name: 'Delete', value: 'delete', description: 'Delete supplier', action: 'Delete a supplier' },
  ],
  default: 'getAll',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: { resource: ['stockTransfer'] } },
	options: [
		{ name: 'Get All', value: 'getAll', description: 'List all stock transfers', action: 'Get all stock transfers' },
		{ name: 'Get', value: 'get', description: 'Get specific transfer by ID', action: 'Get a stock transfer' },
		{ name: 'Create', value: 'create', description: 'Create stock transfer', action: 'Create a stock transfer' },
		{ name: 'Update', value: 'update', description: 'Update stock transfer', action: 'Update a stock transfer' },
		{ name: 'Authorise', value: 'authorise', description: 'Authorise stock transfer', action: 'Authorise a stock transfer' },
		{ name: 'Void', value: 'void', description: 'Void stock transfer', action: 'Void a stock transfer' },
	],
	default: 'getAll',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['location'] } },
  options: [
    { name: 'Get All', value: 'getAll', description: 'List all locations', action: 'Get all locations' },
    { name: 'Get', value: 'get', description: 'Get specific location by ID', action: 'Get a location' },
    { name: 'Create', value: 'create', description: 'Create new location', action: 'Create a location' },
    { name: 'Update', value: 'update', description: 'Update location', action: 'Update a location' },
    { name: 'Delete', value: 'delete', description: 'Delete location', action: 'Delete a location' }
  ],
  default: 'getAll',
},
{
	displayName: 'Product ID',
	name: 'productId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['product'],
			operation: ['get', 'delete'],
		},
	},
	default: '',
	description: 'The ID of the product to retrieve or delete',
},
{
	displayName: 'Page',
	name: 'page',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['product'],
			operation: ['getAll'],
		},
	},
	default: 1,
	description: 'Page number for pagination',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['product'],
			operation: ['getAll'],
		},
	},
	default: 100,
	description: 'Number of products per page (max 100)',
},
{
	displayName: 'Name',
	name: 'name',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['product'],
			operation: ['getAll'],
		},
	},
	default: '',
	description: 'Filter products by name',
},
{
	displayName: 'SKU',
	name: 'sku',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['product'],
			operation: ['getAll'],
		},
	},
	default: '',
	description: 'Filter products by SKU',
},
{
	displayName: 'Modified Since',
	name: 'modifiedSince',
	type: 'dateTime',
	displayOptions: {
		show: {
			resource: ['product'],
			operation: ['getAll'],
		},
	},
	default: '',
	description: 'Filter products modified since this date (YYYY-MM-DD HH:MM:SS format)',
},
{
	displayName: 'Product Name',
	name: 'productName',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['product'],
			operation: ['create', 'update'],
		},
	},
	default: '',
	description: 'Name of the product',
},
{
	displayName: 'Product SKU',
	name: 'productSku',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['product'],
			operation: ['create', 'update'],
		},
	},
	default: '',
	description: 'SKU of the product',
},
{
	displayName: 'Product Type',
	name: 'productType',
	type: 'options',
	options: [
		{
			name: 'Stock',
			value: 'Stock',
		},
		{
			name: 'Service',
			value: 'Service',
		},
		{
			name: 'Bundle',
			value: 'Bundle',
		},
	],
	displayOptions: {
		show: {
			resource: ['product'],
			operation: ['create', 'update'],
		},
	},
	default: 'Stock',
	description: 'Type of the product',
},
{
	displayName: 'Unit of Measure (UOM)',
	name: 'uom',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['product'],
			operation: ['create'],
		},
	},
	default: 'each',
	description: 'Unit of measure for the product',
},
{
	displayName: 'Product ID',
	name: 'updateProductId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['product'],
			operation: ['update'],
		},
	},
	default: '',
	description: 'ID of the product to update',
},
{
	displayName: 'Page',
	name: 'page',
	type: 'number',
	default: 1,
	description: 'Page number for pagination',
	displayOptions: {
		show: {
			resource: ['sale'],
			operation: ['getAll'],
		},
	},
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	default: 100,
	description: 'Number of results per page (max 100)',
	displayOptions: {
		show: {
			resource: ['sale'],
			operation: ['getAll'],
		},
	},
},
{
	displayName: 'Status',
	name: 'status',
	type: 'string',
	default: '',
	description: 'Filter by sale status',
	displayOptions: {
		show: {
			resource: ['sale'],
			operation: ['getAll'],
		},
	},
},
{
	displayName: 'Modified Since',
	name: 'modifiedSince',
	type: 'string',
	default: '',
	description: 'Filter by modification date (format: YYYY-MM-DD HH:MM:SS)',
	displayOptions: {
		show: {
			resource: ['sale'],
			operation: ['getAll'],
		},
	},
},
{
	displayName: 'Sale ID',
	name: 'saleId',
	type: 'string',
	required: true,
	default: '',
	description: 'ID of the sale to retrieve',
	displayOptions: {
		show: {
			resource: ['sale'],
			operation: ['get'],
		},
	},
},
{
	displayName: 'Customer',
	name: 'customer',
	type: 'string',
	required: true,
	default: '',
	description: 'Customer ID or name for the quote',
	displayOptions: {
		show: {
			resource: ['sale'],
			operation: ['createQuote'],
		},
	},
},
{
	displayName: 'Lines',
	name: 'lines',
	type: 'json',
	required: true,
	default: '[]',
	description: 'Quote line items as JSON array',
	displayOptions: {
		show: {
			resource: ['sale'],
			operation: ['createQuote'],
		},
	},
},
{
	displayName: 'External ID',
	name: 'externalId',
	type: 'string',
	default: '',
	description: 'External reference ID for the quote',
	displayOptions: {
		show: {
			resource: ['sale'],
			operation: ['createQuote'],
		},
	},
},
{
	displayName: 'Customer',
	name: 'customer',
	type: 'string',
	required: true,
	default: '',
	description: 'Customer ID or name for the order',
	displayOptions: {
		show: {
			resource: ['sale'],
			operation: ['createOrder'],
		},
	},
},
{
	displayName: 'Lines',
	name: 'lines',
	type: 'json',
	required: true,
	default: '[]',
	description: 'Order line items as JSON array',
	displayOptions: {
		show: {
			resource: ['sale'],
			operation: ['createOrder'],
		},
	},
},
{
	displayName: 'External ID',
	name: 'externalId',
	type: 'string',
	default: '',
	description: 'External reference ID for the order',
	displayOptions: {
		show: {
			resource: ['sale'],
			operation: ['createOrder'],
		},
	},
},
{
	displayName: 'Sale ID',
	name: 'saleId',
	type: 'string',
	required: true,
	default: '',
	description: 'ID of the sale to update',
	displayOptions: {
		show: {
			resource: ['sale'],
			operation: ['update'],
		},
	},
},
{
	displayName: 'Status',
	name: 'status',
	type: 'string',
	default: '',
	description: 'New status for the sale',
	displayOptions: {
		show: {
			resource: ['sale'],
			operation: ['update'],
		},
	},
},
{
	displayName: 'Lines',
	name: 'lines',
	type: 'json',
	default: '[]',
	description: 'Updated line items as JSON array',
	displayOptions: {
		show: {
			resource: ['sale'],
			operation: ['update'],
		},
	},
},
{
	displayName: 'Sale ID',
	name: 'saleId',
	type: 'string',
	required: true,
	default: '',
	description: 'ID of the sale to void',
	displayOptions: {
		show: {
			resource: ['sale'],
			operation: ['void'],
		},
	},
},
{
	displayName: 'Page',
	name: 'page',
	type: 'number',
	default: 1,
	description: 'Page number for pagination',
	displayOptions: {
		show: {
			resource: ['purchase'],
			operation: ['getAll'],
		},
	},
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	default: 100,
	description: 'Number of items per page (max 100)',
	displayOptions: {
		show: {
			resource: ['purchase'],
			operation: ['getAll'],
		},
	},
},
{
	displayName: 'Status',
	name: 'status',
	type: 'string',
	default: '',
	description: 'Filter by purchase status',
	displayOptions: {
		show: {
			resource: ['purchase'],
			operation: ['getAll'],
		},
	},
},
{
	displayName: 'Modified Since',
	name: 'modifiedSince',
	type: 'string',
	default: '',
	description: 'Filter by modification date (YYYY-MM-DD HH:MM:SS format)',
	displayOptions: {
		show: {
			resource: ['purchase'],
			operation: ['getAll'],
		},
	},
},
{
	displayName: 'Purchase ID',
	name: 'purchaseId',
	type: 'string',
	required: true,
	default: '',
	description: 'ID of the purchase to retrieve',
	displayOptions: {
		show: {
			resource: ['purchase'],
			operation: ['get'],
		},
	},
},
{
	displayName: 'Supplier',
	name: 'supplier',
	type: 'string',
	required: true,
	default: '',
	description: 'Supplier information for the purchase order',
	displayOptions: {
		show: {
			resource: ['purchase'],
			operation: ['create'],
		},
	},
},
{
	displayName: 'Lines',
	name: 'lines',
	type: 'json',
	required: true,
	default: '[]',
	description: 'Purchase order line items as JSON array',
	displayOptions: {
		show: {
			resource: ['purchase'],
			operation: ['create', 'update'],
		},
	},
},
{
	displayName: 'Required By',
	name: 'requiredBy',
	type: 'string',
	default: '',
	description: 'Required delivery date (YYYY-MM-DD HH:MM:SS format)',
	displayOptions: {
		show: {
			resource: ['purchase'],
			operation: ['create'],
		},
	},
},
{
	displayName: 'Purchase ID',
	name: 'purchaseId',
	type: 'string',
	required: true,
	default: '',
	description: 'ID of the purchase to update',
	displayOptions: {
		show: {
			resource: ['purchase'],
			operation: ['update', 'authorise'],
		},
	},
},
{
	displayName: 'Status',
	name: 'status',
	type: 'string',
	default: '',
	description: 'New status for the purchase order',
	displayOptions: {
		show: {
			resource: ['purchase'],
			operation: ['update'],
		},
	},
},
{
	displayName: 'Purchase ID',
	name: 'purchaseId',
	type: 'string',
	required: true,
	default: '',
	description: 'ID of the purchase to void',
	displayOptions: {
		show: {
			resource: ['purchase'],
			operation: ['void'],
		},
	},
},
{
  displayName: 'Customer ID',
  name: 'customerId',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['customer'], operation: ['get'] } },
  default: '',
  description: 'The ID of the customer to retrieve',
},
{
  displayName: 'Page',
  name: 'page',
  type: 'number',
  displayOptions: { show: { resource: ['customer'], operation: ['getAll'] } },
  default: 1,
  description: 'Page number for pagination',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  displayOptions: { show: { resource: ['customer'], operation: ['getAll'] } },
  default: 100,
  description: 'Number of items per page (max 100)',
},
{
  displayName: 'Name',
  name: 'name',
  type: 'string',
  displayOptions: { show: { resource: ['customer'], operation: ['getAll'] } },
  default: '',
  description: 'Filter customers by name',
},
{
  displayName: 'Modified Since',
  name: 'modifiedSince',
  type: 'string',
  displayOptions: { show: { resource: ['customer'], operation: ['getAll'] } },
  default: '',
  description: 'Filter customers modified since date (YYYY-MM-DD HH:MM:SS)',
},
{
  displayName: 'Customer Name',
  name: 'customerName',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['customer'], operation: ['create', 'update'] } },
  default: '',
  description: 'Name of the customer',
},
{
  displayName: 'Currency',
  name: 'currency',
  type: 'string',
  displayOptions: { show: { resource: ['customer'], operation: ['create', 'update'] } },
  default: 'USD',
  description: 'Currency code for the customer',
},
{
  displayName: 'Payment Term',
  name: 'paymentTerm',
  type: 'string',
  displayOptions: { show: { resource: ['customer'], operation: ['create'] } },
  default: '',
  description: 'Payment terms for the customer',
},
{
  displayName: 'Customer ID',
  name: 'updateCustomerId',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['customer'], operation: ['update', 'delete'] } },
  default: '',
  description: 'The ID of the customer to update or delete',
},
{
  displayName: 'Supplier ID',
  name: 'supplierId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['supplier'],
      operation: ['get'],
    },
  },
  default: '',
  description: 'The ID of the supplier to retrieve',
},
{
  displayName: 'Page',
  name: 'page',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['supplier'],
      operation: ['getAll'],
    },
  },
  default: 1,
  description: 'Page number for pagination',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['supplier'],
      operation: ['getAll'],
    },
  },
  default: 100,
  description: 'Number of items per page (max 100)',
},
{
  displayName: 'Name',
  name: 'filterName',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['supplier'],
      operation: ['getAll'],
    },
  },
  default: '',
  description: 'Filter suppliers by name',
},
{
  displayName: 'Modified Since',
  name: 'modifiedSince',
  type: 'dateTime',
  displayOptions: {
    show: {
      resource: ['supplier'],
      operation: ['getAll'],
    },
  },
  default: '',
  description: 'Filter suppliers modified since this date (YYYY-MM-DD HH:MM:SS)',
},
{
  displayName: 'Name',
  name: 'name',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['supplier'],
      operation: ['create', 'update'],
    },
  },
  default: '',
  description: 'The name of the supplier',
},
{
  displayName: 'Currency',
  name: 'currency',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['supplier'],
      operation: ['create', 'update'],
    },
  },
  default: 'USD',
  description: 'The currency code for the supplier',
},
{
  displayName: 'Payment Term',
  name: 'paymentTerm',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['supplier'],
      operation: ['create'],
    },
  },
  default: '',
  description: 'Payment terms for the supplier',
},
{
  displayName: 'Supplier ID',
  name: 'updateId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['supplier'],
      operation: ['update'],
    },
  },
  default: '',
  description: 'The ID of the supplier to update',
},
{
  displayName: 'Supplier ID',
  name: 'deleteId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['supplier'],
      operation: ['delete'],
    },
  },
  default: '',
  description: 'The ID of the supplier to delete',
},
{
	displayName: 'Transfer ID',
	name: 'transferId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['stockTransfer'],
			operation: ['get', 'authorise'],
		},
	},
	default: '',
	description: 'The ID of the stock transfer',
},
{
	displayName: 'Page',
	name: 'page',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['stockTransfer'],
			operation: ['getAll'],
		},
	},
	default: 1,
	description: 'Page number for pagination',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['stockTransfer'],
			operation: ['getAll'],
		},
	},
	default: 100,
	description: 'Number of records per page (max 100)',
},
{
	displayName: 'Status',
	name: 'status',
	type: 'options',
	displayOptions: {
		show: {
			resource: ['stockTransfer'],
			operation: ['getAll'],
		},
	},
	options: [
		{ name: 'Draft', value: 'DRAFT' },
		{ name: 'Authorised', value: 'AUTHORISED' },
		{ name: 'Voided', value: 'VOIDED' },
	],
	default: '',
	description: 'Filter by transfer status',
},
{
	displayName: 'Modified Since',
	name: 'modifiedSince',
	type: 'dateTime',
	displayOptions: {
		show: {
			resource: ['stockTransfer'],
			operation: ['getAll'],
		},
	},
	default: '',
	description: 'Filter transfers modified since this date (YYYY-MM-DD HH:MM:SS)',
},
{
	displayName: 'From Location',
	name: 'fromLocation',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['stockTransfer'],
			operation: ['create'],
		},
	},
	default: '',
	description: 'Source location for the transfer',
},
{
	displayName: 'To Location',
	name: 'toLocation',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['stockTransfer'],
			operation: ['create'],
		},
	},
	default: '',
	description: 'Destination location for the transfer',
},
{
	displayName: 'Lines',
	name: 'lines',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['stockTransfer'],
			operation: ['create', 'update'],
		},
	},
	default: '[]',
	description: 'Array of stock transfer line items',
},
{
	displayName: 'Transfer ID',
	name: 'id',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['stockTransfer'],
			operation: ['update', 'void'],
		},
	},
	default: '',
	description: 'The ID of the stock transfer to update or void',
},
{
	displayName: 'Status',
	name: 'updateStatus',
	type: 'options',
	displayOptions: {
		show: {
			resource: ['stockTransfer'],
			operation: ['update'],
		},
	},
	options: [
		{ name: 'Draft', value: 'DRAFT' },
		{ name: 'Authorised', value: 'AUTHORISED' },
	],
	default: 'DRAFT',
	description: 'New status for the transfer',
},
{
  displayName: 'Page',
  name: 'page',
  type: 'number',
  default: 1,
  displayOptions: { show: { resource: ['location'], operation: ['getAll'] } },
  description: 'Page number for pagination',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  default: 100,
  displayOptions: { show: { resource: ['location'], operation: ['getAll'] } },
  description: 'Number of items per page (max 100)',
},
{
  displayName: 'Location ID',
  name: 'locationId',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['location'], operation: ['get', 'update', 'delete'] } },
  default: '',
  description: 'The ID of the location',
},
{
  displayName: 'Name',
  name: 'name',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['location'], operation: ['create', 'update'] } },
  default: '',
  description: 'The name of the location',
},
{
  displayName: 'Is Bin',
  name: 'isBin',
  type: 'boolean',
  displayOptions: { show: { resource: ['location'], operation: ['create', 'update'] } },
  default: false,
  description: 'Whether this location is a bin',
},
{
  displayName: 'Parent Location',
  name: 'parentLocation',
  type: 'string',
  displayOptions: { show: { resource: ['location'], operation: ['create'] } },
  default: '',
  description: 'The ID of the parent location',
},
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const resource = this.getNodeParameter('resource', 0) as string;

    switch (resource) {
      case 'product':
        return [await executeProductOperations.call(this, items)];
      case 'sale':
        return [await executeSaleOperations.call(this, items)];
      case 'purchase':
        return [await executePurchaseOperations.call(this, items)];
      case 'customer':
        return [await executeCustomerOperations.call(this, items)];
      case 'supplier':
        return [await executeSupplierOperations.call(this, items)];
      case 'stockTransfer':
        return [await executeStockTransferOperations.call(this, items)];
      case 'location':
        return [await executeLocationOperations.call(this, items)];
      default:
        throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not supported`);
    }
  }
}

// ============================================================
// Resource Handler Functions
// ============================================================

async function executeProductOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('cin7coreApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getAll': {
					const page = this.getNodeParameter('page', i) as number;
					const limit = this.getNodeParameter('limit', i) as number;
					const name = this.getNodeParameter('name', i) as string;
					const sku = this.getNodeParameter('sku', i) as string;
					const modifiedSince = this.getNodeParameter('modifiedSince', i) as string;

					const queryParams: any = {
						Page: page,
						Limit: limit,
					};

					if (name) queryParams.Name = name;
					if (sku) queryParams.SKU = sku;
					if (modifiedSince) queryParams.ModifiedSince = modifiedSince;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/product`,
						headers: {
							'api-auth-accountid': credentials.accountId,
							'api-auth-applicationkey': credentials.apiKey,
							'Content-Type': 'application/json',
						},
						qs: queryParams,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'get': {
					const productId = this.getNodeParameter('productId', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/product/${productId}`,
						headers: {
							'api-auth-accountid': credentials.accountId,
							'api-auth-applicationkey': credentials.apiKey,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'create': {
					const productName = this.getNodeParameter('productName', i) as string;
					const productSku = this.getNodeParameter('productSku', i) as string;
					const productType = this.getNodeParameter('productType', i) as string;
					const uom = this.getNodeParameter('uom', i) as string;

					const body: any = {
						Name: productName,
						SKU: productSku,
						Type: productType,
						UOM: uom,
					};

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/product`,
						headers: {
							'api-auth-accountid': credentials.accountId,
							'api-auth-applicationkey': credentials.apiKey,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'update': {
					const updateProductId = this.getNodeParameter('updateProductId', i) as string;
					const productName = this.getNodeParameter('productName', i) as string;
					const productSku = this.getNodeParameter('productSku', i) as string;
					const productType = this.getNodeParameter('productType', i) as string;

					const body: any = {
						ID: updateProductId,
						Name: productName,
						SKU: productSku,
						Type: productType,
					};

					const options: any = {
						method: 'PUT',
						url: `${credentials.baseUrl}/product`,
						headers: {
							'api-auth-accountid': credentials.accountId,
							'api-auth-applicationkey': credentials.apiKey,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'delete': {
					const productId = this.getNodeParameter('productId', i) as string;

					const options: any = {
						method: 'DELETE',
						url: `${credentials.baseUrl}/product/${productId}`,
						headers: {
							'api-auth-accountid': credentials.accountId,
							'api-auth-applicationkey': credentials.apiKey,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeSaleOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('cin7coreApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getAll': {
					const page = this.getNodeParameter('page', i) as number;
					const limit = this.getNodeParameter('limit', i) as number;
					const status = this.getNodeParameter('status', i) as string;
					const modifiedSince = this.getNodeParameter('modifiedSince', i) as string;

					const qs: any = {
						page: page,
						limit: Math.min(limit, 100),
					};

					if (status) {
						qs.status = status;
					}

					if (modifiedSince) {
						qs.modifiedsince = modifiedSince;
					}

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/sale`,
						qs,
						headers: {
							'api-auth-accountid': credentials.accountId,
							'api-auth-applicationkey': credentials.apiKey,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'get': {
					const saleId = this.getNodeParameter('saleId', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/sale/${saleId}`,
						headers: {
							'api-auth-accountid': credentials.accountId,
							'api-auth-applicationkey': credentials.apiKey,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'createQuote': {
					const customer = this.getNodeParameter('customer', i) as string;
					const lines = this.getNodeParameter('lines', i) as any;
					const externalId = this.getNodeParameter('externalId', i) as string;

					const body: any = {
						Customer: customer,
						Lines: Array.isArray(lines) ? lines : JSON.parse(lines),
					};

					if (externalId) {
						body.ExternalID = externalId;
					}

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/sale/quote`,
						headers: {
							'api-auth-accountid': credentials.accountId,
							'api-auth-applicationkey': credentials.apiKey,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'createOrder': {
					const customer = this.getNodeParameter('customer', i) as string;
					const lines = this.getNodeParameter('lines', i) as any;
					const externalId = this.getNodeParameter('externalId', i) as string;

					const body: any = {
						Customer: customer,
						Lines: Array.isArray(lines) ? lines : JSON.parse(lines),
					};

					if (externalId) {
						body.ExternalID = externalId;
					}

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/sale/order`,
						headers: {
							'api-auth-accountid': credentials.accountId,
							'api-auth-applicationkey': credentials.apiKey,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'update': {
					const saleId = this.getNodeParameter('saleId', i) as string;
					const status = this.getNodeParameter('status', i) as string;
					const lines = this.getNodeParameter('lines', i) as any;

					const body: any = {
						ID: saleId,
					};

					if (status) {
						body.Status = status;
					}

					if (lines && lines !== '[]') {
						body.Lines = Array.isArray(lines) ? lines : JSON.parse(lines);
					}

					const options: any = {
						method: 'PUT',
						url: `${credentials.baseUrl}/sale`,
						headers: {
							'api-auth-accountid': credentials.accountId,
							'api-auth-applicationkey': credentials.apiKey,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'void': {
					const saleId = this.getNodeParameter('saleId', i) as string;

					const body: any = {
						ID: saleId,
					};

					const options: any = {
						method: 'DELETE',
						url: `${credentials.baseUrl}/sale/void`,
						headers: {
							'api-auth-accountid': credentials.accountId,
							'api-auth-applicationkey': credentials.apiKey,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executePurchaseOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('cin7coreApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			const baseOptions: any = {
				headers: {
					'api-auth-accountid': credentials.accountId,
					'api-auth-applicationkey': credentials.applicationKey,
					'Content-Type': 'application/json',
				},
				json: true,
			};

			switch (operation) {
				case 'getAll': {
					const page = this.getNodeParameter('page', i) as number;
					const limit = this.getNodeParameter('limit', i) as number;
					const status = this.getNodeParameter('status', i) as string;
					const modifiedSince = this.getNodeParameter('modifiedSince', i) as string;

					const queryParams: string[] = [];
					queryParams.push(`Page=${page}`);
					queryParams.push(`Limit=${Math.min(limit, 100)}`);
					if (status) queryParams.push(`Status=${encodeURIComponent(status)}`);
					if (modifiedSince) queryParams.push(`ModifiedSince=${encodeURIComponent(modifiedSince)}`);

					const options: any = {
						...baseOptions,
						method: 'GET',
						url: `${credentials.baseUrl}/purchase?${queryParams.join('&')}`,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'get': {
					const purchaseId = this.getNodeParameter('purchaseId', i) as string;

					const options: any = {
						...baseOptions,
						method: 'GET',
						url: `${credentials.baseUrl}/purchase/${purchaseId}`,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'create': {
					const supplier = this.getNodeParameter('supplier', i) as string;
					const lines = this.getNodeParameter('lines', i) as any;
					const requiredBy = this.getNodeParameter('requiredBy', i) as string;

					const body: any = {
						Supplier: supplier,
						Lines: typeof lines === 'string' ? JSON.parse(lines) : lines,
					};

					if (requiredBy) {
						body.RequiredBy = requiredBy;
					}

					const options: any = {
						...baseOptions,
						method: 'POST',
						url: `${credentials.baseUrl}/purchase`,
						body,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'update': {
					const purchaseId = this.getNodeParameter('purchaseId', i) as string;
					const status = this.getNodeParameter('status', i) as string;
					const lines = this.getNodeParameter('lines', i) as any;

					const body: any = {
						ID: purchaseId,
						Lines: typeof lines === 'string' ? JSON.parse(lines) : lines,
					};

					if (status) {
						body.Status = status;
					}

					const options: any = {
						...baseOptions,
						method: 'PUT',
						url: `${credentials.baseUrl}/purchase`,
						body,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'authorise': {
					const purchaseId = this.getNodeParameter('purchaseId', i) as string;

					const options: any = {
						...baseOptions,
						method: 'POST',
						url: `${credentials.baseUrl}/purchase/${purchaseId}/authorise`,
						body: {},
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'void': {
					const purchaseId = this.getNodeParameter('purchaseId', i) as string;

					const options: any = {
						...baseOptions,
						method: 'DELETE',
						url: `${credentials.baseUrl}/purchase/void`,
						body: {
							ID: purchaseId,
						},
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeCustomerOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('cin7coreApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;
      const baseUrl = credentials.baseUrl || 'https://inventory.dearsystems.com/ExternalApi/v2';
      
      switch (operation) {
        case 'getAll': {
          const page = this.getNodeParameter('page', i, 1) as number;
          const limit = this.getNodeParameter('limit', i, 100) as number;
          const name = this.getNodeParameter('name', i, '') as string;
          const modifiedSince = this.getNodeParameter('modifiedSince', i, '') as string;
          
          let url = `${baseUrl}/customer?Page=${page}&Limit=${Math.min(limit, 100)}`;
          if (name) url += `&Name=${encodeURIComponent(name)}`;
          if (modifiedSince) url += `&ModifiedSince=${encodeURIComponent(modifiedSince)}`;
          
          const options: any = {
            method: 'GET',
            url,
            headers: {
              'api-auth-accountid': credentials.accountId,
              'api-auth-applicationkey': credentials.apiKey,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'get': {
          const customerId = this.getNodeParameter('customerId', i) as string;
          
          const options: any = {
            method: 'GET',
            url: `${baseUrl}/customer/${customerId}`,
            headers: {
              'api-auth-accountid': credentials.accountId,
              'api-auth-applicationkey': credentials.apiKey,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'create': {
          const customerName = this.getNodeParameter('customerName', i) as string;
          const currency = this.getNodeParameter('currency', i, 'USD') as string;
          const paymentTerm = this.getNodeParameter('paymentTerm', i, '') as string;
          
          const body: any = {
            Name: customerName,
            Currency: currency,
          };
          
          if (paymentTerm) {
            body.PaymentTerm = paymentTerm;
          }
          
          const options: any = {
            method: 'POST',
            url: `${baseUrl}/customer`,
            headers: {
              'api-auth-accountid': credentials.accountId,
              'api-auth-applicationkey': credentials.apiKey,
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'update': {
          const customerId = this.getNodeParameter('updateCustomerId', i) as string;
          const customerName = this.getNodeParameter('customerName', i) as string;
          const currency = this.getNodeParameter('currency', i, 'USD') as string;
          
          const body: any = {
            ID: customerId,
            Name: customerName,
            Currency: currency,
          };
          
          const options: any = {
            method: 'PUT',
            url: `${baseUrl}/customer`,
            headers: {
              'api-auth-accountid': credentials.accountId,
              'api-auth-applicationkey': credentials.apiKey,
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'delete': {
          const customerId = this.getNodeParameter('updateCustomerId', i) as string;
          
          const options: any = {
            method: 'DELETE',
            url: `${baseUrl}/customer?ID=${customerId}`,
            headers: {
              'api-auth-accountid': credentials.accountId,
              'api-auth-applicationkey': credentials.apiKey,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }
      
      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
      } else {
        throw error;
      }
    }
  }
  
  return returnData;
}

async function executeSupplierOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('cin7coreApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'getAll': {
          const page = this.getNodeParameter('page', i) as number;
          const limit = this.getNodeParameter('limit', i) as number;
          const filterName = this.getNodeParameter('filterName', i) as string;
          const modifiedSince = this.getNodeParameter('modifiedSince', i) as string;

          let url = `${credentials.baseUrl}/supplier?Page=${page}&Limit=${Math.min(limit, 100)}`;
          if (filterName) {
            url += `&Name=${encodeURIComponent(filterName)}`;
          }
          if (modifiedSince) {
            url += `&ModifiedSince=${encodeURIComponent(modifiedSince)}`;
          }

          const options: any = {
            method: 'GET',
            url,
            headers: {
              'api-auth-accountid': credentials.accountId,
              'api-auth-applicationkey': credentials.apiKey,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'get': {
          const supplierId = this.getNodeParameter('supplierId', i) as string;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/supplier/${supplierId}`,
            headers: {
              'api-auth-accountid': credentials.accountId,
              'api-auth-applicationkey': credentials.apiKey,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'create': {
          const name = this.getNodeParameter('name', i) as string;
          const currency = this.getNodeParameter('currency', i) as string;
          const paymentTerm = this.getNodeParameter('paymentTerm', i) as string;

          const body: any = {
            Name: name,
            Currency: currency,
          };

          if (paymentTerm) {
            body.PaymentTerm = paymentTerm;
          }

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/supplier`,
            headers: {
              'api-auth-accountid': credentials.accountId,
              'api-auth-applicationkey': credentials.apiKey,
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'update': {
          const updateId = this.getNodeParameter('updateId', i) as string;
          const name = this.getNodeParameter('name', i) as string;
          const currency = this.getNodeParameter('currency', i) as string;

          const body: any = {
            ID: updateId,
            Name: name,
            Currency: currency,
          };

          const options: any = {
            method: 'PUT',
            url: `${credentials.baseUrl}/supplier`,
            headers: {
              'api-auth-accountid': credentials.accountId,
              'api-auth-applicationkey': credentials.apiKey,
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'delete': {
          const deleteId = this.getNodeParameter('deleteId', i) as string;

          const options: any = {
            method: 'DELETE',
            url: `${credentials.baseUrl}/supplier?ID=${deleteId}`,
            headers: {
              'api-auth-accountid': credentials.accountId,
              'api-auth-applicationkey': credentials.apiKey,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({
        json: result,
        pairedItem: { item: i },
      });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i },
        });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeStockTransferOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('cin7coreApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getAll': {
					const page = this.getNodeParameter('page', i, 1) as number;
					const limit = this.getNodeParameter('limit', i, 100) as number;
					const status = this.getNodeParameter('status', i, '') as string;
					const modifiedSince = this.getNodeParameter('modifiedSince', i, '') as string;

					const qs: any = {
						page,
						limit: Math.min(limit, 100),
					};

					if (status) {
						qs.Status = status;
					}

					if (modifiedSince) {
						qs.ModifiedSince = modifiedSince;
					}

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/stocktransfer`,
						headers: {
							'api-auth-accountid': credentials.accountId,
							'api-auth-applicationkey': credentials.apiKey,
							'Content-Type': 'application/json',
						},
						qs,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'get': {
					const transferId = this.getNodeParameter('transferId', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/stocktransfer/${transferId}`,
						headers: {
							'api-auth-accountid': credentials.accountId,
							'api-auth-applicationkey': credentials.apiKey,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'create': {
					const fromLocation = this.getNodeParameter('fromLocation', i) as string;
					const toLocation = this.getNodeParameter('toLocation', i) as string;
					const lines = this.getNodeParameter('lines', i) as any[];

					const body = {
						FromLocation: fromLocation,
						ToLocation: toLocation,
						Lines: lines,
					};

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/stocktransfer`,
						headers: {
							'api-auth-accountid': credentials.accountId,
							'api-auth-applicationkey': credentials.apiKey,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'update': {
					const id = this.getNodeParameter('id', i) as string;
					const status = this.getNodeParameter('updateStatus', i) as string;
					const lines = this.getNodeParameter('lines', i) as any[];

					const body = {
						ID: id,
						Status: status,
						Lines: lines,
					};

					const options: any = {
						method: 'PUT',
						url: `${credentials.baseUrl}/stocktransfer`,
						headers: {
							'api-auth-accountid': credentials.accountId,
							'api-auth-applicationkey': credentials.apiKey,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'authorise': {
					const transferId = this.getNodeParameter('transferId', i) as string;

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/stocktransfer/${transferId}/authorise`,
						headers: {
							'api-auth-accountid': credentials.accountId,
							'api-auth-applicationkey': credentials.apiKey,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'void': {
					const id = this.getNodeParameter('id', i) as string;

					const body = {
						ID: id,
					};

					const options: any = {
						method: 'DELETE',
						url: `${credentials.baseUrl}/stocktransfer/void`,
						headers: {
							'api-auth-accountid': credentials.accountId,
							'api-auth-applicationkey': credentials.apiKey,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeLocationOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('cin7coreApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'getAll': {
          const page = this.getNodeParameter('page', i) as number;
          const limit = this.getNodeParameter('limit', i) as number;
          
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/ref/location`,
            headers: {
              'api-auth-accountid': credentials.accountId,
              'api-auth-applicationkey': credentials.applicationKey,
            },
            qs: {
              Page: page,
              Limit: limit,
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'get': {
          const locationId = this.getNodeParameter('locationId', i) as string;
          
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/ref/location/${locationId}`,
            headers: {
              'api-auth-accountid': credentials.accountId,
              'api-auth-applicationkey': credentials.applicationKey,
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'create': {
          const name = this.getNodeParameter('name', i) as string;
          const isBin = this.getNodeParameter('isBin', i) as boolean;
          const parentLocation = this.getNodeParameter('parentLocation', i) as string;

          const body: any = {
            Name: name,
            IsBin: isBin,
          };

          if (parentLocation) {
            body.ParentLocation = parentLocation;
          }

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/ref/location`,
            headers: {
              'api-auth-accountid': credentials.accountId,
              'api-auth-applicationkey': credentials.applicationKey,
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'update': {
          const locationId = this.getNodeParameter('locationId', i) as string;
          const name = this.getNodeParameter('name', i) as string;
          const isBin = this.getNodeParameter('isBin', i) as boolean;

          const body: any = {
            ID: locationId,
            Name: name,
            IsBin: isBin,
          };

          const options: any = {
            method: 'PUT',
            url: `${credentials.baseUrl}/ref/location`,
            headers: {
              'api-auth-accountid': credentials.accountId,
              'api-auth-applicationkey': credentials.applicationKey,
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'delete': {
          const locationId = this.getNodeParameter('locationId', i) as string;

          const options: any = {
            method: 'DELETE',
            url: `${credentials.baseUrl}/ref/location`,
            headers: {
              'api-auth-accountid': credentials.accountId,
              'api-auth-applicationkey': credentials.applicationKey,
              'Content-Type': 'application/json',
            },
            body: {
              ID: locationId,
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}
