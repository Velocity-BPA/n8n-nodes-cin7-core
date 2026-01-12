/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const customerOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['customer'],
      },
    },
    options: [
      {
        name: 'Add Address',
        value: 'addAddress',
        description: 'Add address to customer',
        action: 'Add address to customer',
      },
      {
        name: 'Add Contact',
        value: 'addContact',
        description: 'Add a contact to customer',
        action: 'Add contact to customer',
      },
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new customer',
        action: 'Create a customer',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Deactivate a customer',
        action: 'Delete a customer',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Retrieve a customer by ID',
        action: 'Get a customer',
      },
      {
        name: 'Get Addresses',
        value: 'getAddresses',
        description: 'List customer addresses',
        action: 'Get customer addresses',
      },
      {
        name: 'Get Contacts',
        value: 'getContacts',
        description: 'List customer contacts',
        action: 'Get customer contacts',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Retrieve many customers',
        action: 'Get many customers',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update customer details',
        action: 'Update a customer',
      },
    ],
    default: 'getAll',
  },
];

export const customerFields: INodeProperties[] = [
  // ----------------------------------
  //         customer: get
  // ----------------------------------
  {
    displayName: 'Customer ID',
    name: 'customerId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['customer'],
        operation: ['get', 'update', 'delete', 'getContacts', 'addContact', 'getAddresses', 'addAddress'],
      },
    },
    description: 'The unique identifier of the customer',
  },

  // ----------------------------------
  //         customer: getAll
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['customer'],
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
        resource: ['customer'],
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
        resource: ['customer'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Modified Since',
        name: 'ModifiedSince',
        type: 'dateTime',
        default: '',
        description: 'Return customers modified after this date',
      },
      {
        displayName: 'Name',
        name: 'Name',
        type: 'string',
        default: '',
        description: 'Filter by customer name',
      },
    ],
  },

  // ----------------------------------
  //         customer: create
  // ----------------------------------
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['customer'],
        operation: ['create'],
      },
    },
    description: 'Customer or company name',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['customer'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Account Receivable',
        name: 'AccountReceivable',
        type: 'string',
        default: '',
        description: 'AR account code',
      },
      {
        displayName: 'Credit Limit',
        name: 'CreditLimit',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'Customer credit limit',
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
        description: 'Customer email address',
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
        description: 'Customer phone number',
      },
      {
        displayName: 'Price Tier',
        name: 'PriceTier',
        type: 'string',
        default: '',
        description: 'Assigned price tier',
      },
      {
        displayName: 'Revenue Account',
        name: 'RevenueAccount',
        type: 'string',
        default: '',
        description: 'Revenue account code',
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
  //         customer: update
  // ----------------------------------
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['customer'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Account Receivable',
        name: 'AccountReceivable',
        type: 'string',
        default: '',
        description: 'AR account code',
      },
      {
        displayName: 'Credit Limit',
        name: 'CreditLimit',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'Customer credit limit',
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
        description: 'Customer email address',
      },
      {
        displayName: 'Name',
        name: 'Name',
        type: 'string',
        default: '',
        description: 'Customer name',
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
        description: 'Customer phone number',
      },
      {
        displayName: 'Price Tier',
        name: 'PriceTier',
        type: 'string',
        default: '',
        description: 'Assigned price tier',
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
  //         customer: addContact
  // ----------------------------------
  {
    displayName: 'Contact Name',
    name: 'contactName',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['customer'],
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
        resource: ['customer'],
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

  // ----------------------------------
  //         customer: addAddress
  // ----------------------------------
  {
    displayName: 'Address Line 1',
    name: 'addressLine1',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['customer'],
        operation: ['addAddress'],
      },
    },
    description: 'Street address line 1',
  },
  {
    displayName: 'Address Type',
    name: 'addressType',
    type: 'options',
    options: [
      { name: 'Billing', value: 'Billing' },
      { name: 'Shipping', value: 'Shipping' },
    ],
    default: 'Billing',
    displayOptions: {
      show: {
        resource: ['customer'],
        operation: ['addAddress'],
      },
    },
    description: 'Type of address',
  },
  {
    displayName: 'Address Fields',
    name: 'addressFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['customer'],
        operation: ['addAddress'],
      },
    },
    options: [
      {
        displayName: 'Address Line 2',
        name: 'Line2',
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
];
