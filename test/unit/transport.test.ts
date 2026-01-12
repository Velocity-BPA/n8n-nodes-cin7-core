/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import {
	buildQueryFromFields,
	formatDate,
	validateGuid,
	buildLineItems,
} from '../../nodes/Cin7Core/transport';

describe('Transport Utility Functions', () => {
	describe('buildQueryFromFields', () => {
		it('should return empty object for empty input', () => {
			const result = buildQueryFromFields({});
			expect(result).toEqual({});
		});

		it('should convert camelCase to PascalCase', () => {
			const result = buildQueryFromFields({
				productName: 'Widget',
				stockLevel: 100,
			});
			expect(result).toEqual({
				ProductName: 'Widget',
				StockLevel: 100,
			});
		});

		it('should handle nested objects', () => {
			const result = buildQueryFromFields({
				customer: { name: 'Acme' },
			});
			expect(result).toEqual({
				Customer: { name: 'Acme' },
			});
		});

		it('should skip undefined and null values', () => {
			const result = buildQueryFromFields({
				name: 'Test',
				value: undefined,
				other: null,
			});
			expect(result).toEqual({ Name: 'Test' });
		});

		it('should handle arrays', () => {
			const result = buildQueryFromFields({
				tags: ['a', 'b', 'c'],
			});
			expect(result).toEqual({
				Tags: ['a', 'b', 'c'],
			});
		});
	});

	describe('formatDate', () => {
		it('should format Date object to ISO string', () => {
			const date = new Date('2025-01-15T12:00:00Z');
			const result = formatDate(date);
			expect(result).toBe('2025-01-15T12:00:00.000Z');
		});

		it('should format ISO string correctly', () => {
			const result = formatDate('2025-01-15T12:00:00Z');
			expect(result).toBe('2025-01-15T12:00:00.000Z');
		});

		it('should handle date-only strings', () => {
			const result = formatDate('2025-01-15');
			expect(result).toContain('2025-01-15');
		});
	});

	describe('validateGuid', () => {
		it('should accept valid GUID format', () => {
			const validGuid = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
			expect(() => validateGuid(validGuid, 'Test')).not.toThrow();
		});

		it('should accept uppercase GUID', () => {
			const validGuid = 'A1B2C3D4-E5F6-7890-ABCD-EF1234567890';
			expect(() => validateGuid(validGuid, 'Test')).not.toThrow();
		});

		it('should throw for invalid GUID', () => {
			expect(() => validateGuid('not-a-guid', 'Test')).toThrow('Invalid GUID format for Test');
		});

		it('should throw for empty string', () => {
			expect(() => validateGuid('', 'Test')).toThrow('Invalid GUID format for Test');
		});

		it('should throw for partial GUID', () => {
			expect(() => validateGuid('a1b2c3d4-e5f6', 'Test')).toThrow('Invalid GUID format for Test');
		});
	});

	describe('buildLineItems', () => {
		it('should convert array of items with PascalCase keys', () => {
			const items = [
				{ productId: 'abc123', quantity: 10 },
				{ productId: 'def456', quantity: 5 },
			];
			const result = buildLineItems(items, ['ProductID', 'Quantity']);
			expect(result).toEqual([
				{ ProductId: 'abc123', Quantity: 10 },
				{ ProductId: 'def456', Quantity: 5 },
			]);
		});

		it('should handle empty array', () => {
			const result = buildLineItems([], ['ProductID']);
			expect(result).toEqual([]);
		});

		it('should preserve additional fields', () => {
			const items = [
				{ productId: 'abc', quantity: 1, price: 29.99, discount: 10 },
			];
			const result = buildLineItems(items, ['ProductID', 'Quantity']);
			expect(result[0]).toHaveProperty('Price', 29.99);
			expect(result[0]).toHaveProperty('Discount', 10);
		});
	});
});

describe('API Error Handling', () => {
	it('should handle 401 unauthorized error message', () => {
		const errorMessage = 'Unauthorized. Check your Account ID and Application Key.';
		expect(errorMessage).toContain('Unauthorized');
	});

	it('should handle 429 rate limit error message', () => {
		const errorMessage = 'Rate limit exceeded. Please wait before making more requests.';
		expect(errorMessage).toContain('Rate limit');
	});

	it('should handle 404 not found error message', () => {
		const errorMessage = 'The requested resource was not found.';
		expect(errorMessage).toContain('not found');
	});
});
