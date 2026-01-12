/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const stockTransferOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['stockTransfer'],
      },
    },
    options: [
      {
        name: 'Authorize',
        value: 'authorize',
        description: 'Authorize a stock transfer',
        action: 'Authorize stock transfer',
      },
      {
        name: 'Complete',
        value: 'complete',
        description: 'Complete a stock transfer',
        action: 'Complete stock transfer',
      },
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new stock transfer',
        action: 'Create a stock transfer',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Retrieve a stock transfer by ID',
        action: 'Get a stock transfer',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Retrieve many stock transfers',
        action: 'Get many stock transfers',
      },
      {
        name: 'Pick',
        value: 'pick',
        description: 'Pick items for transfer',
        action: 'Pick stock transfer items',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a stock transfer',
        action: 'Update a stock transfer',
      },
      {
        name: 'Void',
        value: 'void',
        description: 'Void a stock transfer',
        action: 'Void a stock transfer',
      },
    ],
    default: 'getAll',
  },
];

export const stockTransferFields: INodeProperties[] = [
  // ----------------------------------
  //         stockTransfer: get
  // ----------------------------------
  {
    displayName: 'Stock Transfer ID',
    name: 'stockTransferId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['stockTransfer'],
        operation: ['get', 'update', 'authorize', 'pick', 'complete', 'void'],
      },
    },
    description: 'The unique identifier of the stock transfer',
  },

  // ----------------------------------
  //         stockTransfer: getAll
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['stockTransfer'],
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
        resource: ['stockTransfer'],
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
        resource: ['stockTransfer'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'From Location',
        name: 'FromLocation',
        type: 'string',
        default: '',
        description: 'Filter by source location',
      },
      {
        displayName: 'Modified Since',
        name: 'ModifiedSince',
        type: 'dateTime',
        default: '',
        description: 'Return transfers modified after this date',
      },
      {
        displayName: 'Status',
        name: 'Status',
        type: 'options',
        options: [
          { name: 'Draft', value: 'Draft' },
          { name: 'Authorized', value: 'Authorized' },
          { name: 'In Transit', value: 'InTransit' },
          { name: 'Completed', value: 'Completed' },
          { name: 'Void', value: 'Void' },
        ],
        default: 'Draft',
        description: 'Filter by status',
      },
      {
        displayName: 'To Location',
        name: 'ToLocation',
        type: 'string',
        default: '',
        description: 'Filter by destination location',
      },
    ],
  },

  // ----------------------------------
  //         stockTransfer: create
  // ----------------------------------
  {
    displayName: 'From Location',
    name: 'fromLocation',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['stockTransfer'],
        operation: ['create'],
      },
    },
    description: 'Source location name',
  },
  {
    displayName: 'To Location',
    name: 'toLocation',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['stockTransfer'],
        operation: ['create'],
      },
    },
    description: 'Destination location name',
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
        resource: ['stockTransfer'],
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
            description: 'Product SKU',
          },
          {
            displayName: 'Quantity',
            name: 'quantity',
            type: 'number',
            default: 1,
            description: 'Quantity to transfer',
          },
        ],
      },
    ],
    description: 'Line items for the transfer',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['stockTransfer'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Reference',
        name: 'Reference',
        type: 'string',
        default: '',
        description: 'Transfer reference number',
      },
      {
        displayName: 'Required By Date',
        name: 'RequiredByDate',
        type: 'dateTime',
        default: '',
        description: 'Required delivery date',
      },
      {
        displayName: 'Transfer Date',
        name: 'TransferDate',
        type: 'dateTime',
        default: '',
        description: 'Date of transfer',
      },
    ],
  },

  // ----------------------------------
  //         stockTransfer: update
  // ----------------------------------
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['stockTransfer'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'From Location',
        name: 'FromLocation',
        type: 'string',
        default: '',
        description: 'Source location',
      },
      {
        displayName: 'Reference',
        name: 'Reference',
        type: 'string',
        default: '',
        description: 'Transfer reference',
      },
      {
        displayName: 'Required By Date',
        name: 'RequiredByDate',
        type: 'dateTime',
        default: '',
        description: 'Required delivery date',
      },
      {
        displayName: 'To Location',
        name: 'ToLocation',
        type: 'string',
        default: '',
        description: 'Destination location',
      },
    ],
  },
];
