/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { Cin7CoreApi } from '../../credentials/Cin7CoreApi.credentials';

describe('Cin7CoreApi Credentials', () => {
	let credentials: Cin7CoreApi;

	beforeEach(() => {
		credentials = new Cin7CoreApi();
	});

	describe('Credential Configuration', () => {
		it('should have correct name', () => {
			expect(credentials.name).toBe('cin7CoreApi');
		});

		it('should have correct display name', () => {
			expect(credentials.displayName).toBe('Cin7 Core API');
		});

		it('should have correct documentation URL', () => {
			expect(credentials.documentationUrl).toBe('https://dearinventory.docs.apiary.io/');
		});

		it('should have three properties', () => {
			expect(credentials.properties).toHaveLength(3);
		});

		it('should have accountId property', () => {
			const accountIdProp = credentials.properties.find(p => p.name === 'accountId');
			expect(accountIdProp).toBeDefined();
			expect(accountIdProp?.type).toBe('string');
			expect(accountIdProp?.required).toBe(true);
		});

		it('should have applicationKey property', () => {
			const keyProp = credentials.properties.find(p => p.name === 'applicationKey');
			expect(keyProp).toBeDefined();
			expect(keyProp?.type).toBe('string');
			expect(keyProp?.typeOptions?.password).toBe(true);
			expect(keyProp?.required).toBe(true);
		});

		it('should have useV2Api property with default true', () => {
			const v2Prop = credentials.properties.find(p => p.name === 'useV2Api');
			expect(v2Prop).toBeDefined();
			expect(v2Prop?.type).toBe('boolean');
			expect(v2Prop?.default).toBe(true);
		});
	});

	describe('Test Authentication', () => {
		it('should have test property for credential testing', () => {
			expect(credentials.test).toBeDefined();
			expect(credentials.test?.request?.method).toBe('GET');
			expect(credentials.test?.request?.url).toContain('/me');
		});
	});

	describe('Authentication Headers', () => {
		it('should have authenticate method', () => {
			expect(credentials.authenticate).toBeDefined();
		});
	});
});
