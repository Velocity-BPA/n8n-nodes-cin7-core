/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IDataObject } from 'n8n-workflow';

export interface ICin7CoreCredentials {
  accountId: string;
  applicationKey: string;
  useV2Api: boolean;
}

export interface IPaginatedResponse {
  Total: number;
  Page: number;
}

export interface IProduct extends IDataObject {
  ProductID?: string;
  SKU?: string;
  Name?: string;
  Category?: string;
  Brand?: string;
  Type?: 'Standard' | 'BOM' | 'Service';
  CostingMethod?: 'FIFO' | 'FEFO' | 'Average' | 'Special';
  DefaultLocation?: string;
  Barcode?: string;
  MinimumStock?: number;
  MaximumStock?: number;
  UOM?: string;
  Description?: string;
  PriceTiers?: IPriceTierItem[];
  Suppliers?: IProductSupplier[];
}

export interface IProductsResponse extends IPaginatedResponse {
  Products: IProduct[];
}

export interface IPriceTierItem extends IDataObject {
  Name: string;
  Price: number;
}

export interface IProductSupplier extends IDataObject {
  SupplierID: string;
  SupplierName: string;
  Cost: number;
  SupplierProductCode?: string;
}

export interface ISale extends IDataObject {
  SaleID?: string;
  SaleOrderNumber?: string;
  Customer?: string;
  CustomerID?: string;
  Status?: 'Draft' | 'Authorized' | 'Picking' | 'Packing' | 'Shipped' | 'Completed' | 'Void';
  OrderDate?: string;
  ShipBy?: string;
  Location?: string;
  PriceTier?: string;
  TaxRule?: string;
  Currency?: string;
  Lines?: ISaleLine[];
  Total?: number;
  TotalTax?: number;
}

export interface ISalesResponse extends IPaginatedResponse {
  SaleList: ISale[];
}

export interface ISaleLine extends IDataObject {
  ProductID?: string;
  SKU?: string;
  Name?: string;
  Quantity?: number;
  Price?: number;
  Discount?: number;
  Tax?: number;
  Total?: number;
}

export interface IPurchase extends IDataObject {
  PurchaseID?: string;
  PurchaseOrderNumber?: string;
  Supplier?: string;
  SupplierID?: string;
  Status?: 'Draft' | 'Authorized' | 'Received' | 'Completed' | 'Void';
  OrderDate?: string;
  RequiredBy?: string;
  Location?: string;
  Currency?: string;
  Lines?: IPurchaseLine[];
  Total?: number;
}

export interface IPurchasesResponse extends IPaginatedResponse {
  PurchaseList: IPurchase[];
}

export interface IPurchaseLine extends IDataObject {
  ProductID?: string;
  SKU?: string;
  Name?: string;
  Quantity?: number;
  Price?: number;
  Tax?: number;
  Total?: number;
}

export interface ICustomer extends IDataObject {
  CustomerID?: string;
  Name?: string;
  Currency?: string;
  PaymentTerm?: string;
  PriceTier?: string;
  TaxRule?: string;
  AccountReceivable?: string;
  RevenueAccount?: string;
  Discount?: number;
  CreditLimit?: number;
  Email?: string;
  Phone?: string;
  Contacts?: IContact[];
  Addresses?: IAddress[];
}

export interface ICustomersResponse extends IPaginatedResponse {
  CustomerList: ICustomer[];
}

export interface IContact extends IDataObject {
  ContactID?: string;
  Name?: string;
  Email?: string;
  Phone?: string;
  Mobile?: string;
  Default?: boolean;
}

export interface IAddress extends IDataObject {
  AddressID?: string;
  Line1?: string;
  Line2?: string;
  City?: string;
  State?: string;
  PostCode?: string;
  Country?: string;
  Type?: 'Billing' | 'Shipping';
}

export interface ISupplier extends IDataObject {
  SupplierID?: string;
  Name?: string;
  Currency?: string;
  PaymentTerm?: string;
  TaxRule?: string;
  Discount?: number;
  AccountsPayable?: string;
  Email?: string;
  Phone?: string;
  Contacts?: IContact[];
}

export interface ISuppliersResponse extends IPaginatedResponse {
  SupplierList: ISupplier[];
}

export interface IStockTransfer extends IDataObject {
  StockTransferID?: string;
  Number?: string;
  Status?: 'Draft' | 'Authorized' | 'InTransit' | 'Completed' | 'Void';
  FromLocation?: string;
  ToLocation?: string;
  TransferDate?: string;
  RequiredByDate?: string;
  Lines?: IStockTransferLine[];
}

export interface IStockTransfersResponse extends IPaginatedResponse {
  StockTransferList: IStockTransfer[];
}

export interface IStockTransferLine extends IDataObject {
  ProductID?: string;
  SKU?: string;
  Name?: string;
  Quantity?: number;
}

export interface IStockAdjustment extends IDataObject {
  StockAdjustmentID?: string;
  Number?: string;
  Status?: 'Draft' | 'Authorized' | 'Void';
  Location?: string;
  AdjustmentDate?: string;
  AdjustmentType?: 'Increase' | 'Decrease' | 'WriteOff';
  Lines?: IStockAdjustmentLine[];
}

export interface IStockAdjustmentsResponse extends IPaginatedResponse {
  StockAdjustmentList: IStockAdjustment[];
}

export interface IStockAdjustmentLine extends IDataObject {
  ProductID?: string;
  SKU?: string;
  Name?: string;
  Quantity?: number;
  Reason?: string;
}

export interface ILocation extends IDataObject {
  LocationID?: string;
  Name?: string;
  ParentID?: string;
  AddressLine1?: string;
  AddressLine2?: string;
  City?: string;
  State?: string;
  PostCode?: string;
  Country?: string;
  IsDefault?: boolean;
  Deprecated?: boolean;
}

export interface ILocationsResponse extends IPaginatedResponse {
  LocationList: ILocation[];
}

export interface IBomComponent extends IDataObject {
  ComponentProductID: string;
  ProductCode?: string;
  Name?: string;
  Quantity: number;
  WastagePercent?: number;
  Type?: 'Make' | 'Buy';
}

export interface IBom extends IDataObject {
  ProductID: string;
  Components: IBomComponent[];
}

export interface IPriceTier extends IDataObject {
  PriceTierID?: string;
  Name?: string;
}

export interface IPriceTiersResponse {
  PriceTiers: IPriceTier[];
}

export interface IChartOfAccount extends IDataObject {
  AccountCode?: string;
  AccountName?: string;
  AccountType?: 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense';
  Status?: 'Active' | 'Inactive';
}

export interface IChartOfAccountsResponse {
  AccountsList: IChartOfAccount[];
}

export interface IPaymentTerm extends IDataObject {
  PaymentTermID?: string;
  Name?: string;
  Duration?: number;
  Type?: 'DueDate' | 'DueNextMonth';
  Active?: boolean;
}

export interface IPaymentTermsResponse {
  PaymentTermList: IPaymentTerm[];
}

export interface IStockOnHand extends IDataObject {
  ProductID?: string;
  SKU?: string;
  Name?: string;
  Location?: string;
  Available?: number;
  OnHand?: number;
  Allocated?: number;
  OnOrder?: number;
}

export interface IWebhookEvent {
  eventType: string;
  data: IDataObject;
  timestamp: string;
}

export type Cin7CoreResource =
  | 'product'
  | 'sale'
  | 'purchase'
  | 'customer'
  | 'supplier'
  | 'stockTransfer'
  | 'stockAdjustment'
  | 'location'
  | 'bom'
  | 'priceTier'
  | 'chartOfAccounts'
  | 'paymentTerm';

export type ProductOperation =
  | 'get'
  | 'getAll'
  | 'create'
  | 'update'
  | 'delete'
  | 'getAvailability'
  | 'updatePricing'
  | 'attachFile'
  | 'getSuppliers'
  | 'addSupplier';

export type SaleOperation =
  | 'get'
  | 'getAll'
  | 'create'
  | 'update'
  | 'void'
  | 'undo'
  | 'pick'
  | 'pack'
  | 'ship'
  | 'createInvoice'
  | 'addPayment';

export type PurchaseOperation =
  | 'get'
  | 'getAll'
  | 'create'
  | 'update'
  | 'delete'
  | 'authorize'
  | 'receive'
  | 'addCost'
  | 'createCreditNote'
  | 'invoice';

export type CustomerOperation =
  | 'get'
  | 'getAll'
  | 'create'
  | 'update'
  | 'delete'
  | 'getContacts'
  | 'addContact'
  | 'getAddresses'
  | 'addAddress';

export type SupplierOperation =
  | 'get'
  | 'getAll'
  | 'create'
  | 'update'
  | 'delete'
  | 'getContacts'
  | 'addContact'
  | 'getProducts';

export type StockTransferOperation =
  | 'get'
  | 'getAll'
  | 'create'
  | 'update'
  | 'authorize'
  | 'pick'
  | 'complete'
  | 'void';

export type StockAdjustmentOperation =
  | 'get'
  | 'getAll'
  | 'create'
  | 'authorize'
  | 'void';

export type LocationOperation =
  | 'get'
  | 'getAll'
  | 'create'
  | 'update'
  | 'delete'
  | 'getStock';

export type BomOperation =
  | 'get'
  | 'create'
  | 'update'
  | 'delete'
  | 'getComponents'
  | 'addComponent';

export type PriceTierOperation =
  | 'getAll'
  | 'getPrices'
  | 'updatePrice';

export type ChartOfAccountsOperation =
  | 'getAll'
  | 'get';

export type PaymentTermOperation =
  | 'getAll';
