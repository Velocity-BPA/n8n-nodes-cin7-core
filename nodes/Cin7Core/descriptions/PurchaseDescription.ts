/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const purchaseOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['purchase'],
      },
    },
    options: [
      {
        name: 'Add Cost',
        value: 'addCost',
        description: 'Add additional costs to purchase',
        action: 'Add cost to purchase',
      },
      {
        name: 'Authorize',
        value: 'authorize',
        description: 'Authorize a purchase order',
        action: 'Authorize purchase order',
      },
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new purchase order',
        action: 'Create a purchase order',
      },
      {
        name: 'Create Credit Note',
        value: 'createCreditNote',
        description: 'Create credit note for purchase',
        action: 'Create credit note',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a purchase order',
        action: 'Delete a purchase order',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Retrieve a purchase order by ID',
        action: 'Get a purchase order',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Retrieve many purchase orders',
        action: 'Get many purchase orders',
      },
      {
        name: 'Invoice',
        value: 'invoice',
        description: 'Mark purchase as invoiced',
        action: 'Invoice purchase order',
      },
      {
        name: 'Receive',
        value: 'receive',
        description: 'Receive stock against purchase order',
        action: 'Receive purchase order',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a purchase order',
        action: 'Update a purchase order',
      },
    ],
    default: 'getAll',
  },
];

export const purchaseFields: INodeProperties[] = [
  // ----------------------------------
  //         purchase: get
  // ----------------------------------
  {
    displayName: 'Purchase ID',
    name: 'purchaseId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['purchase'],
        operation: ['get', 'update', 'delete', 'authorize', 'receive', 'addCost', 'createCreditNote', 'invoice'],
      },
    },
    description: 'The unique identifier of the purchase order',
  },

  // ----------------------------------
  //         purchase: getAll
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['purchase'],
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
        resource: ['purchase'],
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
        resource: ['purchase'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Modified Since',
        name: 'ModifiedSince',
        type: 'dateTime',
        default: '',
        description: 'Return purchases modified after this date',
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
        displayName: 'Purchase Order Number',
        name: 'PurchaseOrderNumber',
        type: 'string',
        default: '',
        description: 'Filter by purchase order number',
      },
      {
        displayName: 'Status',
        name: 'Status',
        type: 'options',
        options: [
          { name: 'Draft', value: 'Draft' },
          { name: 'Authorized', value: 'Authorized' },
          { name: 'Received', value: 'Received' },
          { name: 'Completed', value: 'Completed' },
          { name: 'Void', value: 'Void' },
        ],
        default: 'Draft',
        description: 'Filter by status',
      },
      {
        displayName: 'Supplier',
        name: 'Supplier',
        type: 'string',
        default: '',
        description: 'Filter by supplier name',
      },
    ],
  },

  // ----------------------------------
  //         purchase: create
  // ----------------------------------
  {
    displayName: 'Supplier',
    name: 'supplier',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['purchase'],
        operation: ['create'],
      },
    },
    description: 'Supplier name for the purchase order',
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
        resource: ['purchase'],
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
            description: 'Quantity to purchase',
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
            displayName: 'Comment',
            name: 'comment',
            type: 'string',
            default: '',
            description: 'Line item comment',
          },
        ],
      },
    ],
    description: 'Line items for the purchase order',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['purchase'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Currency',
        name: 'Currency',
        type: 'string',
        default: '',
        description: 'Purchase currency code',
      },
      {
        displayName: 'Location',
        name: 'Location',
        type: 'string',
        default: '',
        description: 'Receiving location',
      },
      {
        displayName: 'Order Date',
        name: 'OrderDate',
        type: 'dateTime',
        default: '',
        description: 'Order placement date',
      },
      {
        displayName: 'Reference',
        name: 'Reference',
        type: 'string',
        default: '',
        description: 'External reference number',
      },
      {
        displayName: 'Required By',
        name: 'RequiredBy',
        type: 'dateTime',
        default: '',
        description: 'Expected delivery date',
      },
      {
        displayName: 'Supplier ID',
        name: 'SupplierID',
        type: 'string',
        default: '',
        description: 'Supplier unique identifier',
      },
    ],
  },

  // ----------------------------------
  //         purchase: update
  // ----------------------------------
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['purchase'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Currency',
        name: 'Currency',
        type: 'string',
        default: '',
        description: 'Purchase currency code',
      },
      {
        displayName: 'Location',
        name: 'Location',
        type: 'string',
        default: '',
        description: 'Receiving location',
      },
      {
        displayName: 'Reference',
        name: 'Reference',
        type: 'string',
        default: '',
        description: 'External reference',
      },
      {
        displayName: 'Required By',
        name: 'RequiredBy',
        type: 'dateTime',
        default: '',
        description: 'Expected delivery date',
      },
      {
        displayName: 'Supplier',
        name: 'Supplier',
        type: 'string',
        default: '',
        description: 'Supplier name',
      },
    ],
  },

  // ----------------------------------
  //         purchase: receive
  // ----------------------------------
  {
    displayName: 'Receive Lines',
    name: 'receiveLines',
    type: 'fixedCollection',
    typeOptions: {
      multipleValues: true,
    },
    displayOptions: {
      show: {
        resource: ['purchase'],
        operation: ['receive'],
      },
    },
    default: {},
    placeholder: 'Add Line',
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
            displayName: 'Quantity',
            name: 'quantity',
            type: 'number',
            default: 1,
            description: 'Quantity received',
          },
          {
            displayName: 'Batch/Serial',
            name: 'batch',
            type: 'string',
            default: '',
            description: 'Batch or serial number',
          },
          {
            displayName: 'Expiry Date',
            name: 'expiryDate',
            type: 'dateTime',
            default: '',
            description: 'Expiry date for FEFO costing',
          },
        ],
      },
    ],
    description: 'Lines to receive',
  },

  // ----------------------------------
  //         purchase: addCost
  // ----------------------------------
  {
    displayName: 'Cost Type',
    name: 'costType',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['purchase'],
        operation: ['addCost'],
      },
    },
    description: 'Type of additional cost (e.g., Freight, Customs)',
  },
  {
    displayName: 'Amount',
    name: 'costAmount',
    type: 'number',
    typeOptions: {
      numberPrecision: 2,
    },
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['purchase'],
        operation: ['addCost'],
      },
    },
    description: 'Cost amount',
  },

  // ----------------------------------
  //         purchase: createCreditNote
  // ----------------------------------
  {
    displayName: 'Credit Note Lines',
    name: 'creditNoteLines',
    type: 'fixedCollection',
    typeOptions: {
      multipleValues: true,
    },
    displayOptions: {
      show: {
        resource: ['purchase'],
        operation: ['createCreditNote'],
      },
    },
    default: {},
    placeholder: 'Add Line',
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
            displayName: 'Quantity',
            name: 'quantity',
            type: 'number',
            default: 1,
            description: 'Quantity for credit',
          },
          {
            displayName: 'Reason',
            name: 'reason',
            type: 'string',
            default: '',
            description: 'Reason for credit',
          },
        ],
      },
    ],
    description: 'Lines for the credit note',
  },

  // ----------------------------------
  //         purchase: invoice
  // ----------------------------------
  {
    displayName: 'Invoice Details',
    name: 'invoiceDetails',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['purchase'],
        operation: ['invoice'],
      },
    },
    options: [
      {
        displayName: 'Invoice Date',
        name: 'InvoiceDate',
        type: 'dateTime',
        default: '',
        description: 'Supplier invoice date',
      },
      {
        displayName: 'Invoice Number',
        name: 'InvoiceNumber',
        type: 'string',
        default: '',
        description: 'Supplier invoice number',
      },
    ],
  },
];
