/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const locationOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['location'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new location',
        action: 'Create a location',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a location',
        action: 'Delete a location',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Retrieve a location by ID',
        action: 'Get a location',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Retrieve many locations',
        action: 'Get many locations',
      },
      {
        name: 'Get Stock',
        value: 'getStock',
        description: 'Get stock levels at location',
        action: 'Get location stock',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update location details',
        action: 'Update a location',
      },
    ],
    default: 'getAll',
  },
];

export const locationFields: INodeProperties[] = [
  // ----------------------------------
  //         location: get
  // ----------------------------------
  {
    displayName: 'Location ID',
    name: 'locationId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['location'],
        operation: ['get', 'update', 'delete', 'getStock'],
      },
    },
    description: 'The unique identifier of the location',
  },

  // ----------------------------------
  //         location: getAll
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['location'],
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
        resource: ['location'],
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
        resource: ['location'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Include Deprecated',
        name: 'IncludeDeprecated',
        type: 'boolean',
        default: false,
        description: 'Whether to include deprecated locations',
      },
      {
        displayName: 'Modified Since',
        name: 'ModifiedSince',
        type: 'dateTime',
        default: '',
        description: 'Return locations modified after this date',
      },
      {
        displayName: 'Name',
        name: 'Name',
        type: 'string',
        default: '',
        description: 'Filter by location name',
      },
    ],
  },

  // ----------------------------------
  //         location: create
  // ----------------------------------
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['location'],
        operation: ['create'],
      },
    },
    description: 'Location name',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['location'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Address Line 1',
        name: 'AddressLine1',
        type: 'string',
        default: '',
        description: 'Street address line 1',
      },
      {
        displayName: 'Address Line 2',
        name: 'AddressLine2',
        type: 'string',
        default: '',
        description: 'Street address line 2',
      },
      {
        displayName: 'City',
        name: 'City',
        type: 'string',
        default: '',
        description: 'City',
      },
      {
        displayName: 'Country',
        name: 'Country',
        type: 'string',
        default: '',
        description: 'Country',
      },
      {
        displayName: 'Is Default',
        name: 'IsDefault',
        type: 'boolean',
        default: false,
        description: 'Whether this is the default location',
      },
      {
        displayName: 'Parent ID',
        name: 'ParentID',
        type: 'string',
        default: '',
        description: 'Parent location ID for hierarchy',
      },
      {
        displayName: 'Post Code',
        name: 'PostCode',
        type: 'string',
        default: '',
        description: 'Postal/ZIP code',
      },
      {
        displayName: 'State',
        name: 'State',
        type: 'string',
        default: '',
        description: 'State/Province',
      },
    ],
  },

  // ----------------------------------
  //         location: update
  // ----------------------------------
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['location'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Address Line 1',
        name: 'AddressLine1',
        type: 'string',
        default: '',
        description: 'Street address line 1',
      },
      {
        displayName: 'Address Line 2',
        name: 'AddressLine2',
        type: 'string',
        default: '',
        description: 'Street address line 2',
      },
      {
        displayName: 'City',
        name: 'City',
        type: 'string',
        default: '',
        description: 'City',
      },
      {
        displayName: 'Country',
        name: 'Country',
        type: 'string',
        default: '',
        description: 'Country',
      },
      {
        displayName: 'Is Default',
        name: 'IsDefault',
        type: 'boolean',
        default: false,
        description: 'Whether this is the default location',
      },
      {
        displayName: 'Name',
        name: 'Name',
        type: 'string',
        default: '',
        description: 'Location name',
      },
      {
        displayName: 'Post Code',
        name: 'PostCode',
        type: 'string',
        default: '',
        description: 'Postal/ZIP code',
      },
      {
        displayName: 'State',
        name: 'State',
        type: 'string',
        default: '',
        description: 'State/Province',
      },
    ],
  },

  // ----------------------------------
  //         location: getStock
  // ----------------------------------
  {
    displayName: 'Stock Filters',
    name: 'stockFilters',
    type: 'collection',
    placeholder: 'Add Filter',
    default: {},
    displayOptions: {
      show: {
        resource: ['location'],
        operation: ['getStock'],
      },
    },
    options: [
      {
        displayName: 'Category',
        name: 'Category',
        type: 'string',
        default: '',
        description: 'Filter by product category',
      },
      {
        displayName: 'Product ID',
        name: 'ProductID',
        type: 'string',
        default: '',
        description: 'Filter by specific product',
      },
      {
        displayName: 'SKU',
        name: 'SKU',
        type: 'string',
        default: '',
        description: 'Filter by product SKU',
      },
    ],
  },
];
