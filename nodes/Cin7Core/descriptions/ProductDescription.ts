/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const productOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['product'],
      },
    },
    options: [
      {
        name: 'Add Supplier',
        value: 'addSupplier',
        description: 'Add a supplier to a product',
        action: 'Add supplier to product',
      },
      {
        name: 'Attach File',
        value: 'attachFile',
        description: 'Attach a file or image to a product',
        action: 'Attach file to product',
      },
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new product',
        action: 'Create a product',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a product',
        action: 'Delete a product',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Retrieve a product by ID',
        action: 'Get a product',
      },
      {
        name: 'Get Availability',
        value: 'getAvailability',
        description: 'Get product availability across locations',
        action: 'Get product availability',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Retrieve many products',
        action: 'Get many products',
      },
      {
        name: 'Get Suppliers',
        value: 'getSuppliers',
        description: 'List suppliers for a product',
        action: 'Get product suppliers',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a product',
        action: 'Update a product',
      },
      {
        name: 'Update Pricing',
        value: 'updatePricing',
        description: 'Update product pricing tiers',
        action: 'Update product pricing',
      },
    ],
    default: 'getAll',
  },
];

export const productFields: INodeProperties[] = [
  // ----------------------------------
  //         product: get
  // ----------------------------------
  {
    displayName: 'Product ID',
    name: 'productId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['product'],
        operation: ['get', 'delete', 'getAvailability', 'updatePricing', 'attachFile', 'getSuppliers', 'addSupplier'],
      },
    },
    description: 'The unique identifier of the product (GUID format)',
  },

  // ----------------------------------
  //         product: getAll
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['product'],
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
        resource: ['product'],
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
        resource: ['product'],
        operation: ['getAll'],
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
        displayName: 'Modified Since',
        name: 'ModifiedSince',
        type: 'dateTime',
        default: '',
        description: 'Return products modified after this date (ISO 8601 format)',
      },
      {
        displayName: 'Name',
        name: 'Name',
        type: 'string',
        default: '',
        description: 'Filter by product name (contains)',
      },
      {
        displayName: 'SKU',
        name: 'SKU',
        type: 'string',
        default: '',
        description: 'Filter by SKU',
      },
      {
        displayName: 'Type',
        name: 'Type',
        type: 'options',
        options: [
          { name: 'Standard', value: 'Standard' },
          { name: 'BOM', value: 'BOM' },
          { name: 'Service', value: 'Service' },
        ],
        default: 'Standard',
        description: 'Filter by product type',
      },
    ],
  },

  // ----------------------------------
  //         product: create
  // ----------------------------------
  {
    displayName: 'SKU',
    name: 'sku',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['product'],
        operation: ['create'],
      },
    },
    description: 'Stock Keeping Unit - unique product identifier',
  },
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['product'],
        operation: ['create'],
      },
    },
    description: 'Product name',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['product'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Barcode',
        name: 'Barcode',
        type: 'string',
        default: '',
        description: 'Product barcode',
      },
      {
        displayName: 'Brand',
        name: 'Brand',
        type: 'string',
        default: '',
        description: 'Product brand',
      },
      {
        displayName: 'Category',
        name: 'Category',
        type: 'string',
        default: '',
        description: 'Product category',
      },
      {
        displayName: 'Costing Method',
        name: 'CostingMethod',
        type: 'options',
        options: [
          { name: 'FIFO', value: 'FIFO' },
          { name: 'FEFO', value: 'FEFO' },
          { name: 'Average', value: 'Average' },
          { name: 'Special', value: 'Special' },
        ],
        default: 'FIFO',
        description: 'Inventory costing method',
      },
      {
        displayName: 'Default Location',
        name: 'DefaultLocation',
        type: 'string',
        default: '',
        description: 'Default warehouse location',
      },
      {
        displayName: 'Description',
        name: 'Description',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Product description',
      },
      {
        displayName: 'Maximum Stock',
        name: 'MaximumStock',
        type: 'number',
        default: 0,
        description: 'Maximum stock level',
      },
      {
        displayName: 'Minimum Stock',
        name: 'MinimumStock',
        type: 'number',
        default: 0,
        description: 'Minimum stock level / reorder point',
      },
      {
        displayName: 'Type',
        name: 'Type',
        type: 'options',
        options: [
          { name: 'Standard', value: 'Standard' },
          { name: 'BOM', value: 'BOM' },
          { name: 'Service', value: 'Service' },
        ],
        default: 'Standard',
        description: 'Product type',
      },
      {
        displayName: 'Unit of Measure',
        name: 'UOM',
        type: 'string',
        default: 'Each',
        description: 'Unit of measure',
      },
    ],
  },

  // ----------------------------------
  //         product: update
  // ----------------------------------
  {
    displayName: 'Product ID',
    name: 'productId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['product'],
        operation: ['update'],
      },
    },
    description: 'The unique identifier of the product to update',
  },
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['product'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Barcode',
        name: 'Barcode',
        type: 'string',
        default: '',
        description: 'Product barcode',
      },
      {
        displayName: 'Brand',
        name: 'Brand',
        type: 'string',
        default: '',
        description: 'Product brand',
      },
      {
        displayName: 'Category',
        name: 'Category',
        type: 'string',
        default: '',
        description: 'Product category',
      },
      {
        displayName: 'Costing Method',
        name: 'CostingMethod',
        type: 'options',
        options: [
          { name: 'FIFO', value: 'FIFO' },
          { name: 'FEFO', value: 'FEFO' },
          { name: 'Average', value: 'Average' },
          { name: 'Special', value: 'Special' },
        ],
        default: 'FIFO',
        description: 'Inventory costing method',
      },
      {
        displayName: 'Default Location',
        name: 'DefaultLocation',
        type: 'string',
        default: '',
        description: 'Default warehouse location',
      },
      {
        displayName: 'Description',
        name: 'Description',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Product description',
      },
      {
        displayName: 'Maximum Stock',
        name: 'MaximumStock',
        type: 'number',
        default: 0,
        description: 'Maximum stock level',
      },
      {
        displayName: 'Minimum Stock',
        name: 'MinimumStock',
        type: 'number',
        default: 0,
        description: 'Minimum stock level / reorder point',
      },
      {
        displayName: 'Name',
        name: 'Name',
        type: 'string',
        default: '',
        description: 'Product name',
      },
      {
        displayName: 'SKU',
        name: 'SKU',
        type: 'string',
        default: '',
        description: 'Stock Keeping Unit',
      },
      {
        displayName: 'Unit of Measure',
        name: 'UOM',
        type: 'string',
        default: '',
        description: 'Unit of measure',
      },
    ],
  },

  // ----------------------------------
  //         product: updatePricing
  // ----------------------------------
  {
    displayName: 'Price Tiers',
    name: 'priceTiers',
    type: 'fixedCollection',
    typeOptions: {
      multipleValues: true,
    },
    displayOptions: {
      show: {
        resource: ['product'],
        operation: ['updatePricing'],
      },
    },
    default: {},
    placeholder: 'Add Price Tier',
    options: [
      {
        displayName: 'Tier',
        name: 'tier',
        values: [
          {
            displayName: 'Tier Name',
            name: 'tierName',
            type: 'string',
            default: '',
            description: 'Name of the price tier',
          },
          {
            displayName: 'Price',
            name: 'price',
            type: 'number',
            typeOptions: {
              numberPrecision: 2,
            },
            default: 0,
            description: 'Price for this tier',
          },
        ],
      },
    ],
    description: 'Price tiers to update',
  },

  // ----------------------------------
  //         product: attachFile
  // ----------------------------------
  {
    displayName: 'Binary Property',
    name: 'binaryPropertyName',
    type: 'string',
    required: true,
    default: 'data',
    displayOptions: {
      show: {
        resource: ['product'],
        operation: ['attachFile'],
      },
    },
    description: 'Name of the binary property containing the file to upload',
  },

  // ----------------------------------
  //         product: addSupplier
  // ----------------------------------
  {
    displayName: 'Supplier ID',
    name: 'supplierId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['product'],
        operation: ['addSupplier'],
      },
    },
    description: 'The unique identifier of the supplier',
  },
  {
    displayName: 'Supplier Fields',
    name: 'supplierFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['product'],
        operation: ['addSupplier'],
      },
    },
    options: [
      {
        displayName: 'Cost',
        name: 'Cost',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'Supplier cost for this product',
      },
      {
        displayName: 'Supplier Product Code',
        name: 'SupplierProductCode',
        type: 'string',
        default: '',
        description: "The supplier's product code",
      },
    ],
  },
];
