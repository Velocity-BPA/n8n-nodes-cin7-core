/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const saleOperations: INodeProperties[] = [
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
        name: 'Add Payment',
        value: 'addPayment',
        description: 'Record payment against a sale',
        action: 'Add payment to sale',
      },
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new sale order',
        action: 'Create a sale',
      },
      {
        name: 'Create Invoice',
        value: 'createInvoice',
        description: 'Generate invoice for a sale',
        action: 'Create invoice for sale',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Retrieve a sale by ID or number',
        action: 'Get a sale',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Retrieve many sales',
        action: 'Get many sales',
      },
      {
        name: 'Pack',
        value: 'pack',
        description: 'Pack items for shipment',
        action: 'Pack sale items',
      },
      {
        name: 'Pick',
        value: 'pick',
        description: 'Pick items for a sale',
        action: 'Pick sale items',
      },
      {
        name: 'Ship',
        value: 'ship',
        description: 'Ship a sale order',
        action: 'Ship sale',
      },
      {
        name: 'Undo',
        value: 'undo',
        description: 'Undo a voided sale',
        action: 'Undo sale void',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update an existing sale',
        action: 'Update a sale',
      },
      {
        name: 'Void',
        value: 'void',
        description: 'Void a sale',
        action: 'Void a sale',
      },
    ],
    default: 'getAll',
  },
];

export const saleFields: INodeProperties[] = [
  // ----------------------------------
  //         sale: get
  // ----------------------------------
  {
    displayName: 'Sale ID',
    name: 'saleId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['sale'],
        operation: ['get', 'update', 'void', 'undo', 'pick', 'pack', 'ship', 'createInvoice', 'addPayment'],
      },
    },
    description: 'The unique identifier of the sale',
  },

  // ----------------------------------
  //         sale: getAll
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['sale'],
        operation: ['getAll'],
      },
    },
    description: 'Whether to return all results or only up to a given limit',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    typeOptions: {
      minValue: 1,
      maxValue: 1000,
    },
    default: 100,
    displayOptions: {
      show: {
        resource: ['sale'],
        operation: ['getAll'],
        returnAll: [false],
      },
    },
    description: 'Max number of results to return',
  },
  {
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filter',
    default: {},
    displayOptions: {
      show: {
        resource: ['sale'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Customer',
        name: 'Customer',
        type: 'string',
        default: '',
        description: 'Filter by customer name',
      },
      {
        displayName: 'Modified Since',
        name: 'ModifiedSince',
        type: 'dateTime',
        default: '',
        description: 'Return sales modified after this date',
      },
      {
        displayName: 'Order Date From',
        name: 'OrderDateFrom',
        type: 'dateTime',
        default: '',
        description: 'Filter by order date (from)',
      },
      {
        displayName: 'Order Date To',
        name: 'OrderDateTo',
        type: 'dateTime',
        default: '',
        description: 'Filter by order date (to)',
      },
      {
        displayName: 'Sale Order Number',
        name: 'SaleOrderNumber',
        type: 'string',
        default: '',
        description: 'Filter by sale order number',
      },
      {
        displayName: 'Status',
        name: 'Status',
        type: 'options',
        options: [
          { name: 'Draft', value: 'Draft' },
          { name: 'Authorized', value: 'Authorized' },
          { name: 'Picking', value: 'Picking' },
          { name: 'Packing', value: 'Packing' },
          { name: 'Shipped', value: 'Shipped' },
          { name: 'Completed', value: 'Completed' },
          { name: 'Void', value: 'Void' },
        ],
        default: 'Draft',
        description: 'Filter by sale status',
      },
    ],
  },

  // ----------------------------------
  //         sale: create
  // ----------------------------------
  {
    displayName: 'Customer',
    name: 'customer',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['sale'],
        operation: ['create'],
      },
    },
    description: 'Customer name for the sale',
  },
  {
    displayName: 'Lines',
    name: 'lines',
    type: 'fixedCollection',
    typeOptions: {
      multipleValues: true,
    },
    required: true,
    displayOptions: {
      show: {
        resource: ['sale'],
        operation: ['create'],
      },
    },
    default: {},
    placeholder: 'Add Line Item',
    options: [
      {
        displayName: 'Line',
        name: 'line',
        values: [
          {
            displayName: 'Product ID',
            name: 'productId',
            type: 'string',
            default: '',
            description: 'The product ID',
          },
          {
            displayName: 'SKU',
            name: 'sku',
            type: 'string',
            default: '',
            description: 'Product SKU (alternative to Product ID)',
          },
          {
            displayName: 'Quantity',
            name: 'quantity',
            type: 'number',
            default: 1,
            description: 'Quantity to sell',
          },
          {
            displayName: 'Price',
            name: 'price',
            type: 'number',
            typeOptions: {
              numberPrecision: 2,
            },
            default: 0,
            description: 'Unit price',
          },
          {
            displayName: 'Discount',
            name: 'discount',
            type: 'number',
            typeOptions: {
              numberPrecision: 2,
            },
            default: 0,
            description: 'Discount percentage',
          },
          {
            displayName: 'Comment',
            name: 'comment',
            type: 'string',
            default: '',
            description: 'Line item comment',
          },
        ],
      },
    ],
    description: 'Line items for the sale',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['sale'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Currency',
        name: 'Currency',
        type: 'string',
        default: '',
        description: 'Transaction currency code (e.g., USD, EUR)',
      },
      {
        displayName: 'Customer ID',
        name: 'CustomerID',
        type: 'string',
        default: '',
        description: 'Customer unique identifier (alternative to Customer name)',
      },
      {
        displayName: 'Location',
        name: 'Location',
        type: 'string',
        default: '',
        description: 'Fulfillment location name',
      },
      {
        displayName: 'Order Date',
        name: 'OrderDate',
        type: 'dateTime',
        default: '',
        description: 'Date of the order',
      },
      {
        displayName: 'Price Tier',
        name: 'PriceTier',
        type: 'string',
        default: '',
        description: 'Pricing tier to apply',
      },
      {
        displayName: 'Reference',
        name: 'Reference',
        type: 'string',
        default: '',
        description: 'External reference number',
      },
      {
        displayName: 'Ship By',
        name: 'ShipBy',
        type: 'dateTime',
        default: '',
        description: 'Required ship date',
      },
      {
        displayName: 'Tax Rule',
        name: 'TaxRule',
        type: 'string',
        default: '',
        description: 'Tax calculation rule to apply',
      },
    ],
  },

  // ----------------------------------
  //         sale: update
  // ----------------------------------
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['sale'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Currency',
        name: 'Currency',
        type: 'string',
        default: '',
        description: 'Transaction currency code',
      },
      {
        displayName: 'Customer',
        name: 'Customer',
        type: 'string',
        default: '',
        description: 'Customer name',
      },
      {
        displayName: 'Location',
        name: 'Location',
        type: 'string',
        default: '',
        description: 'Fulfillment location',
      },
      {
        displayName: 'Price Tier',
        name: 'PriceTier',
        type: 'string',
        default: '',
        description: 'Pricing tier',
      },
      {
        displayName: 'Reference',
        name: 'Reference',
        type: 'string',
        default: '',
        description: 'External reference',
      },
      {
        displayName: 'Ship By',
        name: 'ShipBy',
        type: 'dateTime',
        default: '',
        description: 'Required ship date',
      },
    ],
  },

  // ----------------------------------
  //         sale: ship
  // ----------------------------------
  {
    displayName: 'Shipping Details',
    name: 'shippingDetails',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['sale'],
        operation: ['ship'],
      },
    },
    options: [
      {
        displayName: 'Carrier',
        name: 'Carrier',
        type: 'string',
        default: '',
        description: 'Shipping carrier name',
      },
      {
        displayName: 'Ship Date',
        name: 'ShipDate',
        type: 'dateTime',
        default: '',
        description: 'Actual ship date',
      },
      {
        displayName: 'Tracking Number',
        name: 'TrackingNumber',
        type: 'string',
        default: '',
        description: 'Shipment tracking number',
      },
    ],
  },

  // ----------------------------------
  //         sale: addPayment
  // ----------------------------------
  {
    displayName: 'Amount',
    name: 'amount',
    type: 'number',
    typeOptions: {
      numberPrecision: 2,
    },
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['sale'],
        operation: ['addPayment'],
      },
    },
    description: 'Payment amount',
  },
  {
    displayName: 'Payment Details',
    name: 'paymentDetails',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['sale'],
        operation: ['addPayment'],
      },
    },
    options: [
      {
        displayName: 'Account',
        name: 'Account',
        type: 'string',
        default: '',
        description: 'Payment account code',
      },
      {
        displayName: 'Payment Date',
        name: 'PaymentDate',
        type: 'dateTime',
        default: '',
        description: 'Date of payment',
      },
      {
        displayName: 'Payment Method',
        name: 'PaymentMethod',
        type: 'string',
        default: '',
        description: 'Payment method (e.g., Cash, Credit Card)',
      },
      {
        displayName: 'Reference',
        name: 'Reference',
        type: 'string',
        default: '',
        description: 'Payment reference number',
      },
    ],
  },
];
