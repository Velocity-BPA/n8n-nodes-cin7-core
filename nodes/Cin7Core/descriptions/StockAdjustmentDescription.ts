/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const stockAdjustmentOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['stockAdjustment'],
      },
    },
    options: [
      {
        name: 'Authorize',
        value: 'authorize',
        description: 'Authorize a stock adjustment',
        action: 'Authorize stock adjustment',
      },
      {
        name: 'Create',
        value: 'create',
        description: 'Create a stock adjustment',
        action: 'Create a stock adjustment',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Retrieve a stock adjustment by ID',
        action: 'Get a stock adjustment',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Retrieve many stock adjustments',
        action: 'Get many stock adjustments',
      },
      {
        name: 'Void',
        value: 'void',
        description: 'Void a stock adjustment',
        action: 'Void a stock adjustment',
      },
    ],
    default: 'getAll',
  },
];

export const stockAdjustmentFields: INodeProperties[] = [
  // ----------------------------------
  //         stockAdjustment: get
  // ----------------------------------
  {
    displayName: 'Stock Adjustment ID',
    name: 'stockAdjustmentId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['stockAdjustment'],
        operation: ['get', 'authorize', 'void'],
      },
    },
    description: 'The unique identifier of the stock adjustment',
  },

  // ----------------------------------
  //         stockAdjustment: getAll
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['stockAdjustment'],
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
        resource: ['stockAdjustment'],
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
        resource: ['stockAdjustment'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Location',
        name: 'Location',
        type: 'string',
        default: '',
        description: 'Filter by location',
      },
      {
        displayName: 'Modified Since',
        name: 'ModifiedSince',
        type: 'dateTime',
        default: '',
        description: 'Return adjustments modified after this date',
      },
      {
        displayName: 'Status',
        name: 'Status',
        type: 'options',
        options: [
          { name: 'Draft', value: 'Draft' },
          { name: 'Authorized', value: 'Authorized' },
          { name: 'Void', value: 'Void' },
        ],
        default: 'Draft',
        description: 'Filter by status',
      },
    ],
  },

  // ----------------------------------
  //         stockAdjustment: create
  // ----------------------------------
  {
    displayName: 'Location',
    name: 'location',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['stockAdjustment'],
        operation: ['create'],
      },
    },
    description: 'Adjustment location name',
  },
  {
    displayName: 'Adjustment Type',
    name: 'adjustmentType',
    type: 'options',
    options: [
      { name: 'Increase', value: 'Increase' },
      { name: 'Decrease', value: 'Decrease' },
      { name: 'Write Off', value: 'WriteOff' },
    ],
    required: true,
    default: 'Increase',
    displayOptions: {
      show: {
        resource: ['stockAdjustment'],
        operation: ['create'],
      },
    },
    description: 'Type of adjustment',
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
        resource: ['stockAdjustment'],
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
            description: 'Quantity to adjust',
          },
          {
            displayName: 'Reason',
            name: 'reason',
            type: 'string',
            default: '',
            description: 'Reason for adjustment',
          },
        ],
      },
    ],
    description: 'Line items for the adjustment',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['stockAdjustment'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Adjustment Date',
        name: 'AdjustmentDate',
        type: 'dateTime',
        default: '',
        description: 'Date of adjustment',
      },
      {
        displayName: 'Reference',
        name: 'Reference',
        type: 'string',
        default: '',
        description: 'Adjustment reference',
      },
    ],
  },
];
