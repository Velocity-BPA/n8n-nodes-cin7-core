/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const supplierOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['supplier'],
      },
    },
    options: [
      {
        name: 'Add Contact',
        value: 'addContact',
        description: 'Add contact to supplier',
        action: 'Add contact to supplier',
      },
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new supplier',
        action: 'Create a supplier',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Deactivate a supplier',
        action: 'Delete a supplier',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Retrieve a supplier by ID',
        action: 'Get a supplier',
      },
      {
        name: 'Get Contacts',
        value: 'getContacts',
        description: 'List supplier contacts',
        action: 'Get supplier contacts',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Retrieve many suppliers',
        action: 'Get many suppliers',
      },
      {
        name: 'Get Products',
        value: 'getProducts',
        description: 'List products from supplier',
        action: 'Get supplier products',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update supplier details',
        action: 'Update a supplier',
      },
    ],
    default: 'getAll',
  },
];

export const supplierFields: INodeProperties[] = [
  // ----------------------------------
  //         supplier: get
  // ----------------------------------
  {
    displayName: 'Supplier ID',
    name: 'supplierId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['supplier'],
        operation: ['get', 'update', 'delete', 'getContacts', 'addContact', 'getProducts'],
      },
    },
    description: 'The unique identifier of the supplier',
  },

  // ----------------------------------
  //         supplier: getAll
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['supplier'],
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
        resource: ['supplier'],
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
        resource: ['supplier'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Modified Since',
        name: 'ModifiedSince',
        type: 'dateTime',
        default: '',
        description: 'Return suppliers modified after this date',
      },
      {
        displayName: 'Name',
        name: 'Name',
        type: 'string',
        default: '',
        description: 'Filter by supplier name',
      },
    ],
  },

  // ----------------------------------
  //         supplier: create
  // ----------------------------------
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['supplier'],
        operation: ['create'],
      },
    },
    description: 'Supplier name',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['supplier'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Accounts Payable',
        name: 'AccountsPayable',
        type: 'string',
        default: '',
        description: 'AP account code',
      },
      {
        displayName: 'Currency',
        name: 'Currency',
        type: 'string',
        default: '',
        description: 'Default currency code',
      },
      {
        displayName: 'Discount',
        name: 'Discount',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'Default discount percentage',
      },
      {
        displayName: 'Email',
        name: 'Email',
        type: 'string',
        placeholder: 'name@email.com',
        default: '',
        description: 'Supplier email address',
      },
      {
        displayName: 'Payment Term',
        name: 'PaymentTerm',
        type: 'string',
        default: '',
        description: 'Default payment terms',
      },
      {
        displayName: 'Phone',
        name: 'Phone',
        type: 'string',
        default: '',
        description: 'Supplier phone number',
      },
      {
        displayName: 'Tax Rule',
        name: 'TaxRule',
        type: 'string',
        default: '',
        description: 'Default tax rule',
      },
    ],
  },

  // ----------------------------------
  //         supplier: update
  // ----------------------------------
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['supplier'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Accounts Payable',
        name: 'AccountsPayable',
        type: 'string',
        default: '',
        description: 'AP account code',
      },
      {
        displayName: 'Currency',
        name: 'Currency',
        type: 'string',
        default: '',
        description: 'Default currency code',
      },
      {
        displayName: 'Discount',
        name: 'Discount',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'Default discount percentage',
      },
      {
        displayName: 'Email',
        name: 'Email',
        type: 'string',
        placeholder: 'name@email.com',
        default: '',
        description: 'Supplier email address',
      },
      {
        displayName: 'Name',
        name: 'Name',
        type: 'string',
        default: '',
        description: 'Supplier name',
      },
      {
        displayName: 'Payment Term',
        name: 'PaymentTerm',
        type: 'string',
        default: '',
        description: 'Default payment terms',
      },
      {
        displayName: 'Phone',
        name: 'Phone',
        type: 'string',
        default: '',
        description: 'Supplier phone number',
      },
      {
        displayName: 'Tax Rule',
        name: 'TaxRule',
        type: 'string',
        default: '',
        description: 'Default tax rule',
      },
    ],
  },

  // ----------------------------------
  //         supplier: addContact
  // ----------------------------------
  {
    displayName: 'Contact Name',
    name: 'contactName',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['supplier'],
        operation: ['addContact'],
      },
    },
    description: 'Name of the contact',
  },
  {
    displayName: 'Contact Fields',
    name: 'contactFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['supplier'],
        operation: ['addContact'],
      },
    },
    options: [
      {
        displayName: 'Default',
        name: 'Default',
        type: 'boolean',
        default: false,
        description: 'Whether this is the default contact',
      },
      {
        displayName: 'Email',
        name: 'Email',
        type: 'string',
        placeholder: 'name@email.com',
        default: '',
        description: 'Contact email',
      },
      {
        displayName: 'Mobile',
        name: 'Mobile',
        type: 'string',
        default: '',
        description: 'Contact mobile number',
      },
      {
        displayName: 'Phone',
        name: 'Phone',
        type: 'string',
        default: '',
        description: 'Contact phone number',
      },
    ],
  },
];
