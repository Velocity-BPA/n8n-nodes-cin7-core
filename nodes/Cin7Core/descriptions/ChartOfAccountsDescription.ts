/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const chartOfAccountsOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['chartOfAccounts'],
      },
    },
    options: [
      {
        name: 'Get',
        value: 'get',
        description: 'Get account details',
        action: 'Get an account',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'List all accounts',
        action: 'Get many accounts',
      },
    ],
    default: 'getAll',
  },
];

export const chartOfAccountsFields: INodeProperties[] = [
  // ----------------------------------
  //         chartOfAccounts: get
  // ----------------------------------
  {
    displayName: 'Account Code',
    name: 'accountCode',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['chartOfAccounts'],
        operation: ['get'],
      },
    },
    description: 'The account code',
  },

  // ----------------------------------
  //         chartOfAccounts: getAll
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['chartOfAccounts'],
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
        resource: ['chartOfAccounts'],
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
        resource: ['chartOfAccounts'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Account Type',
        name: 'AccountType',
        type: 'options',
        options: [
          { name: 'Asset', value: 'Asset' },
          { name: 'Liability', value: 'Liability' },
          { name: 'Equity', value: 'Equity' },
          { name: 'Revenue', value: 'Revenue' },
          { name: 'Expense', value: 'Expense' },
        ],
        default: 'Asset',
        description: 'Filter by account type',
      },
      {
        displayName: 'Status',
        name: 'Status',
        type: 'options',
        options: [
          { name: 'Active', value: 'Active' },
          { name: 'Inactive', value: 'Inactive' },
        ],
        default: 'Active',
        description: 'Filter by status',
      },
    ],
  },
];
