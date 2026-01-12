/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const bomOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['bom'],
      },
    },
    options: [
      {
        name: 'Add Component',
        value: 'addComponent',
        description: 'Add component to BOM',
        action: 'Add component to BOM',
      },
      {
        name: 'Create',
        value: 'create',
        description: 'Create BOM for product',
        action: 'Create a BOM',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a BOM',
        action: 'Delete a BOM',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Retrieve BOM by product ID',
        action: 'Get a BOM',
      },
      {
        name: 'Get Components',
        value: 'getComponents',
        description: 'List BOM components',
        action: 'Get BOM components',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update BOM components',
        action: 'Update a BOM',
      },
    ],
    default: 'get',
  },
];

export const bomFields: INodeProperties[] = [
  // ----------------------------------
  //         bom: get
  // ----------------------------------
  {
    displayName: 'Product ID',
    name: 'productId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['bom'],
        operation: ['get', 'create', 'update', 'delete', 'getComponents', 'addComponent'],
      },
    },
    description: 'The product ID for the BOM',
  },

  // ----------------------------------
  //         bom: create / update
  // ----------------------------------
  {
    displayName: 'Components',
    name: 'components',
    type: 'fixedCollection',
    typeOptions: {
      multipleValues: true,
    },
    displayOptions: {
      show: {
        resource: ['bom'],
        operation: ['create', 'update'],
      },
    },
    default: {},
    placeholder: 'Add Component',
    options: [
      {
        displayName: 'Component',
        name: 'component',
        values: [
          {
            displayName: 'Component Product ID',
            name: 'componentProductId',
            type: 'string',
            required: true,
            default: '',
            description: 'The product ID of the component',
          },
          {
            displayName: 'Quantity',
            name: 'quantity',
            type: 'number',
            typeOptions: {
              numberPrecision: 4,
            },
            required: true,
            default: 1,
            description: 'Required quantity of the component',
          },
          {
            displayName: 'Wastage Percent',
            name: 'wastagePercent',
            type: 'number',
            typeOptions: {
              numberPrecision: 2,
            },
            default: 0,
            description: 'Wastage percentage for this component',
          },
          {
            displayName: 'Type',
            name: 'type',
            type: 'options',
            options: [
              { name: 'Make', value: 'Make' },
              { name: 'Buy', value: 'Buy' },
            ],
            default: 'Buy',
            description: 'Component type',
          },
        ],
      },
    ],
    description: 'BOM components',
  },

  // ----------------------------------
  //         bom: addComponent
  // ----------------------------------
  {
    displayName: 'Component Product ID',
    name: 'componentProductId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['bom'],
        operation: ['addComponent'],
      },
    },
    description: 'The product ID of the component to add',
  },
  {
    displayName: 'Quantity',
    name: 'quantity',
    type: 'number',
    typeOptions: {
      numberPrecision: 4,
    },
    required: true,
    default: 1,
    displayOptions: {
      show: {
        resource: ['bom'],
        operation: ['addComponent'],
      },
    },
    description: 'Required quantity of the component',
  },
  {
    displayName: 'Component Options',
    name: 'componentOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['bom'],
        operation: ['addComponent'],
      },
    },
    options: [
      {
        displayName: 'Type',
        name: 'Type',
        type: 'options',
        options: [
          { name: 'Make', value: 'Make' },
          { name: 'Buy', value: 'Buy' },
        ],
        default: 'Buy',
        description: 'Component type',
      },
      {
        displayName: 'Wastage Percent',
        name: 'WastagePercent',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'Wastage percentage',
      },
    ],
  },
];
