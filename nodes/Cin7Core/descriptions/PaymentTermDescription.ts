/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const paymentTermOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['paymentTerm'],
      },
    },
    options: [
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'List all payment terms',
        action: 'Get many payment terms',
      },
    ],
    default: 'getAll',
  },
];

export const paymentTermFields: INodeProperties[] = [
  // ----------------------------------
  //         paymentTerm: getAll
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['paymentTerm'],
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
        resource: ['paymentTerm'],
        operation: ['getAll'],
        returnAll: [false],
      },
    },
    description: 'Max number of results to return',
  },
];
