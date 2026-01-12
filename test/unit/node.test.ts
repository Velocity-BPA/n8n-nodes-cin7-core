/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { Cin7Core } from '../../nodes/Cin7Core/Cin7Core.node';
import { Cin7CoreTrigger } from '../../nodes/Cin7Core/Cin7CoreTrigger.node';

describe('Cin7Core Node', () => {
	let node: Cin7Core;

	beforeEach(() => {
		node = new Cin7Core();
	});

	describe('Node Description', () => {
		it('should have correct display name', () => {
			expect(node.description.displayName).toBe('Cin7 Core');
		});

		it('should have correct name', () => {
			expect(node.description.name).toBe('cin7Core');
		});

		it('should have correct icon', () => {
			expect(node.description.icon).toBe('file:cin7core.svg');
		});

		it('should have version 1', () => {
			expect(node.description.version).toBe(1);
		});

		it('should have correct credential requirements', () => {
			expect(node.description.credentials).toBeDefined();
			expect(node.description.credentials?.[0]?.name).toBe('cin7CoreApi');
			expect(node.description.credentials?.[0]?.required).toBe(true);
		});

		it('should have resource property', () => {
			const resourceProp = node.description.properties.find(p => p.name === 'resource');
			expect(resourceProp).toBeDefined();
			expect(resourceProp?.type).toBe('options');
		});
	});

	describe('Resources', () => {
		const resourceProp = new Cin7Core().description.properties.find(p => p.name === 'resource');
		const resources = resourceProp?.options as Array<{ value: string; name: string }>;

		it('should have 12 resources', () => {
			expect(resources).toHaveLength(12);
		});

		it('should have product resource', () => {
			const product = resources?.find(r => r.value === 'product');
			expect(product).toBeDefined();
			expect(product?.name).toBe('Product');
		});

		it('should have sale resource', () => {
			const sale = resources?.find(r => r.value === 'sale');
			expect(sale).toBeDefined();
			expect(sale?.name).toBe('Sale');
		});

		it('should have purchase resource', () => {
			const purchase = resources?.find(r => r.value === 'purchase');
			expect(purchase).toBeDefined();
			expect(purchase?.name).toBe('Purchase');
		});

		it('should have customer resource', () => {
			const customer = resources?.find(r => r.value === 'customer');
			expect(customer).toBeDefined();
			expect(customer?.name).toBe('Customer');
		});

		it('should have supplier resource', () => {
			const supplier = resources?.find(r => r.value === 'supplier');
			expect(supplier).toBeDefined();
			expect(supplier?.name).toBe('Supplier');
		});

		it('should have stockTransfer resource', () => {
			const transfer = resources?.find(r => r.value === 'stockTransfer');
			expect(transfer).toBeDefined();
			expect(transfer?.name).toBe('Stock Transfer');
		});

		it('should have stockAdjustment resource', () => {
			const adjustment = resources?.find(r => r.value === 'stockAdjustment');
			expect(adjustment).toBeDefined();
			expect(adjustment?.name).toBe('Stock Adjustment');
		});

		it('should have location resource', () => {
			const location = resources?.find(r => r.value === 'location');
			expect(location).toBeDefined();
			expect(location?.name).toBe('Location');
		});

		it('should have bom resource', () => {
			const bom = resources?.find(r => r.value === 'bom');
			expect(bom).toBeDefined();
			expect(bom?.name).toBe('Bill of Materials');
		});

		it('should have priceTier resource', () => {
			const priceTier = resources?.find(r => r.value === 'priceTier');
			expect(priceTier).toBeDefined();
			expect(priceTier?.name).toBe('Price Tier');
		});

		it('should have chartOfAccounts resource', () => {
			const accounts = resources?.find(r => r.value === 'chartOfAccounts');
			expect(accounts).toBeDefined();
			expect(accounts?.name).toBe('Chart of Accounts');
		});

		it('should have paymentTerm resource', () => {
			const terms = resources?.find(r => r.value === 'paymentTerm');
			expect(terms).toBeDefined();
			expect(terms?.name).toBe('Payment Term');
		});
	});

	describe('Operations', () => {
		it('should have product operations', () => {
			const operations = node.description.properties.find(
				p => p.name === 'operation' && 
				p.displayOptions?.show?.resource?.includes('product')
			);
			expect(operations).toBeDefined();
		});

		it('should have sale operations', () => {
			const operations = node.description.properties.find(
				p => p.name === 'operation' && 
				p.displayOptions?.show?.resource?.includes('sale')
			);
			expect(operations).toBeDefined();
		});

		it('should have execute method', () => {
			expect(node.execute).toBeDefined();
			expect(typeof node.execute).toBe('function');
		});
	});
});

describe('Cin7CoreTrigger Node', () => {
	let trigger: Cin7CoreTrigger;

	beforeEach(() => {
		trigger = new Cin7CoreTrigger();
	});

	describe('Trigger Description', () => {
		it('should have correct display name', () => {
			expect(trigger.description.displayName).toBe('Cin7 Core Trigger');
		});

		it('should have correct name', () => {
			expect(trigger.description.name).toBe('cin7CoreTrigger');
		});

		it('should be a polling trigger', () => {
			expect(trigger.description.polling).toBe(true);
		});

		it('should have no inputs', () => {
			expect(trigger.description.inputs).toEqual([]);
		});

		it('should have event property', () => {
			const eventProp = trigger.description.properties.find(p => p.name === 'event');
			expect(eventProp).toBeDefined();
			expect(eventProp?.type).toBe('options');
		});
	});

	describe('Trigger Events', () => {
		const eventProp = new Cin7CoreTrigger().description.properties.find(p => p.name === 'event');
		const events = eventProp?.options as Array<{ value: string; name: string }>;

		it('should have multiple event options', () => {
			expect(events?.length).toBeGreaterThan(5);
		});

		it('should have sale events', () => {
			const saleEvents = events?.filter(e => e.value.startsWith('sale'));
			expect(saleEvents?.length).toBeGreaterThanOrEqual(3);
		});

		it('should have product events', () => {
			const productEvents = events?.filter(e => e.value.startsWith('product'));
			expect(productEvents?.length).toBeGreaterThanOrEqual(2);
		});

		it('should have purchase events', () => {
			const purchaseEvents = events?.filter(e => e.value.startsWith('purchase'));
			expect(purchaseEvents?.length).toBeGreaterThanOrEqual(2);
		});
	});

	describe('Trigger Options', () => {
		it('should have options property', () => {
			const optionsProp = trigger.description.properties.find(p => p.name === 'options');
			expect(optionsProp).toBeDefined();
			expect(optionsProp?.type).toBe('collection');
		});

		it('should have poll method', () => {
			expect(trigger.poll).toBeDefined();
			expect(typeof trigger.poll).toBe('function');
		});
	});
});
