/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const priceTierOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['priceTier'],
      },
    },
    options: [
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'List all price tiers',
        action: 'Get many price tiers',
      },
      {
        name: 'Get Prices',
        value: 'getPrices',
        description: 'Get prices for a tier',
        action: 'Get tier prices',
      },
      {
        name: 'Update Price',
        value: 'updatePrice',
        description: 'Update tier price for product',
        action: 'Update tier price',
      },
    ],
    default: 'getAll',
  },
];

export const priceTierFields: INodeProperties[] = [
  // ----------------------------------
  //         priceTier: getPrices
  // ----------------------------------
  {
    displayName: 'Price Tier Name',
    name: 'priceTierName',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['priceTier'],
        operation: ['getPrices'],
      },
    },
    description: 'Name of the price tier',
  },
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['priceTier'],
        operation: ['getPrices'],
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
        resource: ['priceTier'],
        operation: ['getPrices'],
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
        resource: ['priceTier'],
        operation: ['getPrices'],
      },
    },
    options: [
      {
        displayName: 'Product ID',
        name: 'ProductID',
        type: 'string',
        default: '',
        description: 'Filter by product ID',
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

  // ----------------------------------
  //         priceTier: updatePrice
  // ----------------------------------
  {
    displayName: 'Price Tier Name',
    name: 'priceTierName',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['priceTier'],
        operation: ['updatePrice'],
      },
    },
    description: 'Name of the price tier',
  },
  {
    displayName: 'Product ID',
    name: 'productId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['priceTier'],
        operation: ['updatePrice'],
      },
    },
    description: 'The product ID',
  },
  {
    displayName: 'Price',
    name: 'price',
    type: 'number',
    typeOptions: {
      numberPrecision: 2,
    },
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['priceTier'],
        operation: ['updatePrice'],
      },
    },
    description: 'New price for the tier',
  },
];
