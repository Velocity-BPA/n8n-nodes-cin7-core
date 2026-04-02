/**
 * Copyright (c) 2026 Velocity BPA
 * Licensed under the Business Source License 1.1
 */

import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { Cin7Core } from '../nodes/Cin7 Core/Cin7 Core.node';

// Mock n8n-workflow
jest.mock('n8n-workflow', () => ({
  ...jest.requireActual('n8n-workflow'),
  NodeApiError: class NodeApiError extends Error {
    constructor(node: any, error: any) { super(error.message || 'API Error'); }
  },
  NodeOperationError: class NodeOperationError extends Error {
    constructor(node: any, message: string) { super(message); }
  },
}));

describe('Cin7Core Node', () => {
  let node: Cin7Core;

  beforeAll(() => {
    node = new Cin7Core();
  });

  describe('Node Definition', () => {
    it('should have correct basic properties', () => {
      expect(node.description.displayName).toBe('Cin7 Core');
      expect(node.description.name).toBe('cin7core');
      expect(node.description.version).toBe(1);
      expect(node.description.inputs).toContain('main');
      expect(node.description.outputs).toContain('main');
    });

    it('should define 7 resources', () => {
      const resourceProp = node.description.properties.find(
        (p: any) => p.name === 'resource'
      );
      expect(resourceProp).toBeDefined();
      expect(resourceProp!.type).toBe('options');
      expect(resourceProp!.options).toHaveLength(7);
    });

    it('should have operation dropdowns for each resource', () => {
      const operations = node.description.properties.filter(
        (p: any) => p.name === 'operation'
      );
      expect(operations.length).toBe(7);
    });

    it('should require credentials', () => {
      expect(node.description.credentials).toBeDefined();
      expect(node.description.credentials!.length).toBeGreaterThan(0);
      expect(node.description.credentials![0].required).toBe(true);
    });

    it('should have parameters with proper displayOptions', () => {
      const params = node.description.properties.filter(
        (p: any) => p.displayOptions?.show?.resource
      );
      for (const param of params) {
        expect(param.displayOptions.show.resource).toBeDefined();
        expect(Array.isArray(param.displayOptions.show.resource)).toBe(true);
      }
    });
  });

  // Resource-specific tests
describe('Product Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-api-key',
				accountId: 'test-account-id',
				baseUrl: 'https://inventory.dearsystems.com/ExternalApi/v2',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	it('should get all products successfully', async () => {
		const mockResponse = { products: [{ id: '1', name: 'Test Product', sku: 'TEST-SKU' }] };
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getAll')
			.mockReturnValueOnce(1)
			.mockReturnValueOnce(100)
			.mockReturnValueOnce('')
			.mockReturnValueOnce('')
			.mockReturnValueOnce('');

		const result = await executeProductOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual(mockResponse);
	});

	it('should handle get all products error', async () => {
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
		mockExecuteFunctions.getNodeParameter.mockReturnValue('getAll');
		mockExecuteFunctions.continueOnFail.mockReturnValue(true);

		const result = await executeProductOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json.error).toBe('API Error');
	});

	it('should get a specific product successfully', async () => {
		const mockResponse = { id: '123', name: 'Test Product', sku: 'TEST-SKU' };
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('get')
			.mockReturnValueOnce('123');

		const result = await executeProductOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual(mockResponse);
	});

	it('should create a product successfully', async () => {
		const mockResponse = { id: '456', name: 'New Product', sku: 'NEW-SKU' };
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('create')
			.mockReturnValueOnce('New Product')
			.mockReturnValueOnce('NEW-SKU')
			.mockReturnValueOnce('Stock')
			.mockReturnValueOnce('each');

		const result = await executeProductOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual(mockResponse);
	});

	it('should update a product successfully', async () => {
		const mockResponse = { id: '789', name: 'Updated Product', sku: 'UPDATED-SKU' };
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('update')
			.mockReturnValueOnce('789')
			.mockReturnValueOnce('Updated Product')
			.mockReturnValueOnce('UPDATED-SKU')
			.mockReturnValueOnce('Stock');

		const result = await executeProductOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual(mockResponse);
	});

	it('should delete a product successfully', async () => {
		const mockResponse = { success: true, message: 'Product deleted' };
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('delete')
			.mockReturnValueOnce('123');

		const result = await executeProductOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual(mockResponse);
	});

	it('should handle unknown operation error', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValue('unknown');

		await expect(executeProductOperations.call(mockExecuteFunctions, [{ json: {} }])).rejects.toThrow('Unknown operation: unknown');
	});
});

describe('Sale Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-key',
				accountId: 'test-account',
				baseUrl: 'https://inventory.dearsystems.com/ExternalApi/v2',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	it('should get all sales successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
			switch (param) {
				case 'operation': return 'getAll';
				case 'page': return 1;
				case 'limit': return 50;
				case 'status': return '';
				case 'modifiedSince': return '';
				default: return undefined;
			}
		});

		const mockResponse = { sales: [{ id: '1', customer: 'Test Customer' }] };
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

		const result = await executeSaleOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'GET',
			url: 'https://inventory.dearsystems.com/ExternalApi/v2/sale',
			qs: { page: 1, limit: 50 },
			headers: {
				'api-auth-accountid': 'test-account',
				'api-auth-applicationkey': 'test-key',
			},
			json: true,
		});
		expect(result[0].json).toEqual(mockResponse);
	});

	it('should create a quote successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
			switch (param) {
				case 'operation': return 'createQuote';
				case 'customer': return 'CUST001';
				case 'lines': return [{ product: 'TEST', quantity: 1 }];
				case 'externalId': return 'EXT123';
				default: return undefined;
			}
		});

		const mockResponse = { id: 'quote-123', status: 'created' };
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

		const result = await executeSaleOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'POST',
			url: 'https://inventory.dearsystems.com/ExternalApi/v2/sale/quote',
			headers: {
				'api-auth-accountid': 'test-account',
				'api-auth-applicationkey': 'test-key',
				'Content-Type': 'application/json',
			},
			body: {
				Customer: 'CUST001',
				Lines: [{ product: 'TEST', quantity: 1 }],
				ExternalID: 'EXT123',
			},
			json: true,
		});
		expect(result[0].json).toEqual(mockResponse);
	});

	it('should handle errors when continue on fail is true', async () => {
		mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
			switch (param) {
				case 'operation': return 'get';
				case 'saleId': return 'invalid-id';
				default: return undefined;
			}
		});
		mockExecuteFunctions.continueOnFail.mockReturnValue(true);
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Sale not found'));

		const result = await executeSaleOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result[0].json).toEqual({ error: 'Sale not found' });
	});

	it('should void a sale successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
			switch (param) {
				case 'operation': return 'void';
				case 'saleId': return 'sale-123';
				default: return undefined;
			}
		});

		const mockResponse = { success: true, message: 'Sale voided' };
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

		const result = await executeSaleOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'DELETE',
			url: 'https://inventory.dearsystems.com/ExternalApi/v2/sale/void',
			headers: {
				'api-auth-accountid': 'test-account',
				'api-auth-applicationkey': 'test-key',
				'Content-Type': 'application/json',
			},
			body: { ID: 'sale-123' },
			json: true,
		});
		expect(result[0].json).toEqual(mockResponse);
	});
});

describe('Purchase Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				accountId: 'test-account',
				applicationKey: 'test-key',
				baseUrl: 'https://inventory.dearsystems.com/ExternalApi/v2',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	describe('getAll operation', () => {
		it('should retrieve all purchases successfully', async () => {
			const mockResponse = { purchases: [], totalCount: 0 };
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getAll')
				.mockReturnValueOnce(1)
				.mockReturnValueOnce(100)
				.mockReturnValueOnce('')
				.mockReturnValueOnce('');

			const result = await executePurchaseOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://inventory.dearsystems.com/ExternalApi/v2/purchase?Page=1&Limit=100',
				headers: {
					'api-auth-accountid': 'test-account',
					'api-auth-applicationkey': 'test-key',
					'Content-Type': 'application/json',
				},
				json: true,
			});
		});

		it('should handle getAll operation error', async () => {
			const error = new Error('API Error');
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(error);
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getAll');
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executePurchaseOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
		});
	});

	describe('get operation', () => {
		it('should retrieve specific purchase successfully', async () => {
			const mockResponse = { ID: 'purchase-123', Status: 'Draft' };
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('get')
				.mockReturnValueOnce('purchase-123');

			const result = await executePurchaseOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://inventory.dearsystems.com/ExternalApi/v2/purchase/purchase-123',
				headers: {
					'api-auth-accountid': 'test-account',
					'api-auth-applicationkey': 'test-key',
					'Content-Type': 'application/json',
				},
				json: true,
			});
		});
	});

	describe('create operation', () => {
		it('should create purchase successfully', async () => {
			const mockResponse = { ID: 'purchase-456', Status: 'Created' };
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('create')
				.mockReturnValueOnce('Supplier ABC')
				.mockReturnValueOnce('[{"ProductSKU": "SKU123", "Quantity": 10}]')
				.mockReturnValueOnce('2024-12-31 00:00:00');

			const result = await executePurchaseOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'POST',
				url: 'https://inventory.dearsystems.com/ExternalApi/v2/purchase',
				headers: {
					'api-auth-accountid': 'test-account',
					'api-auth-applicationkey': 'test-key',
					'Content-Type': 'application/json',
				},
				body: {
					Supplier: 'Supplier ABC',
					Lines: [{ ProductSKU: 'SKU123', Quantity: 10 }],
					RequiredBy: '2024-12-31 00:00:00',
				},
				json: true,
			});
		});
	});

	describe('update operation', () => {
		it('should update purchase successfully', async () => {
			const mockResponse = { ID: 'purchase-123', Status: 'Updated' };
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('update')
				.mockReturnValueOnce('purchase-123')
				.mockReturnValueOnce('Approved')
				.mockReturnValueOnce('[{"ProductSKU": "SKU123", "Quantity": 15}]');

			const result = await executePurchaseOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});

	describe('authorise operation', () => {
		it('should authorise purchase successfully', async () => {
			const mockResponse = { ID: 'purchase-123', Status: 'Authorised' };
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('authorise')
				.mockReturnValueOnce('purchase-123');

			const result = await executePurchaseOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});

	describe('void operation', () => {
		it('should void purchase successfully', async () => {
			const mockResponse = { ID: 'purchase-123', Status: 'Voided' };
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('void')
				.mockReturnValueOnce('purchase-123');

			const result = await executePurchaseOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'DELETE',
				url: 'https://inventory.dearsystems.com/ExternalApi/v2/purchase/void',
				headers: {
					'api-auth-accountid': 'test-account',
					'api-auth-applicationkey': 'test-key',
					'Content-Type': 'application/json',
				},
				body: {
					ID: 'purchase-123',
				},
				json: true,
			});
		});
	});
});

describe('Customer Resource', () => {
  let mockExecuteFunctions: any;
  
  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ 
        apiKey: 'test-key', 
        accountId: 'test-account',
        baseUrl: 'https://inventory.dearsystems.com/ExternalApi/v2' 
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { httpRequest: jest.fn(), requestWithAuthentication: jest.fn() },
    };
  });

  it('should get all customers successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getAll')
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(50)
      .mockReturnValueOnce('')
      .mockReturnValueOnce('');
    
    const mockResponse = { customers: [{ ID: '1', Name: 'Test Customer' }] };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeCustomerOperations.call(mockExecuteFunctions, [{ json: {} }]);
    
    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://inventory.dearsystems.com/ExternalApi/v2/customer?Page=1&Limit=50',
      headers: {
        'api-auth-accountid': 'test-account',
        'api-auth-applicationkey': 'test-key',
        'Content-Type': 'application/json',
      },
      json: true,
    });
  });

  it('should get specific customer successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('get')
      .mockReturnValueOnce('customer-123');
    
    const mockResponse = { ID: 'customer-123', Name: 'Test Customer' };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeCustomerOperations.call(mockExecuteFunctions, [{ json: {} }]);
    
    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
  });

  it('should create customer successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('create')
      .mockReturnValueOnce('New Customer')
      .mockReturnValueOnce('USD')
      .mockReturnValueOnce('NET30');
    
    const mockResponse = { ID: 'new-customer-id', Name: 'New Customer' };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeCustomerOperations.call(mockExecuteFunctions, [{ json: {} }]);
    
    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'POST',
      url: 'https://inventory.dearsystems.com/ExternalApi/v2/customer',
      headers: {
        'api-auth-accountid': 'test-account',
        'api-auth-applicationkey': 'test-key',
        'Content-Type': 'application/json',
      },
      body: {
        Name: 'New Customer',
        Currency: 'USD',
        PaymentTerm: 'NET30',
      },
      json: true,
    });
  });

  it('should handle errors gracefully when continueOnFail is true', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('get');
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

    const result = await executeCustomerOperations.call(mockExecuteFunctions, [{ json: {} }]);
    
    expect(result).toHaveLength(1);
    expect(result[0].json.error).toBe('API Error');
  });
});

describe('Supplier Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-key',
        accountId: 'test-account',
        baseUrl: 'https://inventory.dearsystems.com/ExternalApi/v2',
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
      },
    };
  });

  it('should get all suppliers', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getAll')
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(50)
      .mockReturnValueOnce('')
      .mockReturnValueOnce('');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      suppliers: [{ id: '1', name: 'Test Supplier' }],
    });

    const result = await executeSupplierOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://inventory.dearsystems.com/ExternalApi/v2/supplier?Page=1&Limit=50',
      headers: {
        'api-auth-accountid': 'test-account',
        'api-auth-applicationkey': 'test-key',
      },
      json: true,
    });

    expect(result).toEqual([{
      json: { suppliers: [{ id: '1', name: 'Test Supplier' }] },
      pairedItem: { item: 0 },
    }]);
  });

  it('should get a specific supplier', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('get')
      .mockReturnValueOnce('123');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      id: '123',
      name: 'Test Supplier',
    });

    const result = await executeSupplierOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://inventory.dearsystems.com/ExternalApi/v2/supplier/123',
      headers: {
        'api-auth-accountid': 'test-account',
        'api-auth-applicationkey': 'test-key',
      },
      json: true,
    });

    expect(result).toEqual([{
      json: { id: '123', name: 'Test Supplier' },
      pairedItem: { item: 0 },
    }]);
  });

  it('should create a new supplier', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('create')
      .mockReturnValueOnce('New Supplier')
      .mockReturnValueOnce('USD')
      .mockReturnValueOnce('Net 30');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      id: '456',
      name: 'New Supplier',
    });

    const result = await executeSupplierOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'POST',
      url: 'https://inventory.dearsystems.com/ExternalApi/v2/supplier',
      headers: {
        'api-auth-accountid': 'test-account',
        'api-auth-applicationkey': 'test-key',
        'Content-Type': 'application/json',
      },
      body: {
        Name: 'New Supplier',
        Currency: 'USD',
        PaymentTerm: 'Net 30',
      },
      json: true,
    });

    expect(result).toEqual([{
      json: { id: '456', name: 'New Supplier' },
      pairedItem: { item: 0 },
    }]);
  });

  it('should handle errors gracefully when continueOnFail is true', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('get').mockReturnValueOnce('invalid-id');
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Supplier not found'));

    const result = await executeSupplierOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{
      json: { error: 'Supplier not found' },
      pairedItem: { item: 0 },
    }]);
  });
});

describe('StockTransfer Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-key',
				accountId: 'test-account',
				baseUrl: 'https://inventory.dearsystems.com/ExternalApi/v2',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	it('should get all stock transfers successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getAll')
			.mockReturnValueOnce(1)
			.mockReturnValueOnce(50)
			.mockReturnValueOnce('DRAFT')
			.mockReturnValueOnce('');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			StockTransfers: [{ ID: 'transfer-1', Status: 'DRAFT' }],
		});

		const result = await executeStockTransferOperations.call(
			mockExecuteFunctions,
			[{ json: {} }],
		);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual({
			StockTransfers: [{ ID: 'transfer-1', Status: 'DRAFT' }],
		});
	});

	it('should get specific stock transfer successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('get')
			.mockReturnValueOnce('transfer-123');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			ID: 'transfer-123',
			Status: 'AUTHORISED',
		});

		const result = await executeStockTransferOperations.call(
			mockExecuteFunctions,
			[{ json: {} }],
		);

		expect(result).toHaveLength(1);
		expect(result[0].json.ID).toBe('transfer-123');
	});

	it('should create stock transfer successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('create')
			.mockReturnValueOnce('Location A')
			.mockReturnValueOnce('Location B')
			.mockReturnValueOnce([{ ProductID: 'prod-1', Quantity: 10 }]);

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			ID: 'new-transfer-123',
			Status: 'DRAFT',
		});

		const result = await executeStockTransferOperations.call(
			mockExecuteFunctions,
			[{ json: {} }],
		);

		expect(result).toHaveLength(1);
		expect(result[0].json.ID).toBe('new-transfer-123');
	});

	it('should update stock transfer successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('update')
			.mockReturnValueOnce('transfer-123')
			.mockReturnValueOnce('AUTHORISED')
			.mockReturnValueOnce([{ ProductID: 'prod-1', Quantity: 15 }]);

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			ID: 'transfer-123',
			Status: 'AUTHORISED',
		});

		const result = await executeStockTransferOperations.call(
			mockExecuteFunctions,
			[{ json: {} }],
		);

		expect(result).toHaveLength(1);
		expect(result[0].json.Status).toBe('AUTHORISED');
	});

	it('should authorise stock transfer successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('authorise')
			.mockReturnValueOnce('transfer-123');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			ID: 'transfer-123',
			Status: 'AUTHORISED',
		});

		const result = await executeStockTransferOperations.call(
			mockExecuteFunctions,
			[{ json: {} }],
		);

		expect(result).toHaveLength(1);
		expect(result[0].json.Status).toBe('AUTHORISED');
	});

	it('should void stock transfer successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('void')
			.mockReturnValueOnce('transfer-123');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			ID: 'transfer-123',
			Status: 'VOIDED',
		});

		const result = await executeStockTransferOperations.call(
			mockExecuteFunctions,
			[{ json: {} }],
		);

		expect(result).toHaveLength(1);
		expect(result[0].json.Status).toBe('VOIDED');
	});

	it('should handle API errors', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('get').mockReturnValueOnce('invalid-id');
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Stock transfer not found'));

		await expect(
			executeStockTransferOperations.call(mockExecuteFunctions, [{ json: {} }]),
		).rejects.toThrow('Stock transfer not found');
	});

	it('should handle errors with continueOnFail', async () => {
		mockExecuteFunctions.continueOnFail.mockReturnValue(true);
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('get').mockReturnValueOnce('invalid-id');
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

		const result = await executeStockTransferOperations.call(
			mockExecuteFunctions,
			[{ json: {} }],
		);

		expect(result).toHaveLength(1);
		expect(result[0].json.error).toBe('API Error');
	});
});

describe('Location Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        accountId: 'test-account',
        applicationKey: 'test-key',
        baseUrl: 'https://inventory.dearsystems.com/ExternalApi/v2'
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn()
      },
    };
  });

  it('should get all locations successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getAll');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce(1);
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce(100);
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ locations: [] });

    const result = await executeLocationOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://inventory.dearsystems.com/ExternalApi/v2/ref/location',
      headers: {
        'api-auth-accountid': 'test-account',
        'api-auth-applicationkey': 'test-key',
      },
      qs: { Page: 1, Limit: 100 },
      json: true,
    });
    expect(result).toEqual([{ json: { locations: [] }, pairedItem: { item: 0 } }]);
  });

  it('should get location by ID successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('get');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('123');
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ ID: '123', Name: 'Test Location' });

    const result = await executeLocationOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://inventory.dearsystems.com/ExternalApi/v2/ref/location/123',
      headers: {
        'api-auth-accountid': 'test-account',
        'api-auth-applicationkey': 'test-key',
      },
      json: true,
    });
    expect(result).toEqual([{ json: { ID: '123', Name: 'Test Location' }, pairedItem: { item: 0 } }]);
  });

  it('should create location successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('create');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('New Location');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce(false);
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('parent-123');
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ ID: '456', Name: 'New Location' });

    const result = await executeLocationOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'POST',
      url: 'https://inventory.dearsystems.com/ExternalApi/v2/ref/location',
      headers: {
        'api-auth-accountid': 'test-account',
        'api-auth-applicationkey': 'test-key',
        'Content-Type': 'application/json',
      },
      body: { Name: 'New Location', IsBin: false, ParentLocation: 'parent-123' },
      json: true,
    });
    expect(result).toEqual([{ json: { ID: '456', Name: 'New Location' }, pairedItem: { item: 0 } }]);
  });

  it('should update location successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('update');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('123');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('Updated Location');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce(true);
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ ID: '123', Name: 'Updated Location' });

    const result = await executeLocationOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'PUT',
      url: 'https://inventory.dearsystems.com/ExternalApi/v2/ref/location',
      headers: {
        'api-auth-accountid': 'test-account',
        'api-auth-applicationkey': 'test-key',
        'Content-Type': 'application/json',
      },
      body: { ID: '123', Name: 'Updated Location', IsBin: true },
      json: true,
    });
    expect(result).toEqual([{ json: { ID: '123', Name: 'Updated Location' }, pairedItem: { item: 0 } }]);
  });

  it('should delete location successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('delete');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('123');
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ success: true });

    const result = await executeLocationOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'DELETE',
      url: 'https://inventory.dearsystems.com/ExternalApi/v2/ref/location',
      headers: {
        'api-auth-accountid': 'test-account',
        'api-auth-applicationkey': 'test-key',
        'Content-Type': 'application/json',
      },
      body: { ID: '123' },
      json: true,
    });
    expect(result).toEqual([{ json: { success: true }, pairedItem: { item: 0 } }]);
  });

  it('should handle errors when continueOnFail is true', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('get');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('123');
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

    const result = await executeLocationOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
  });

  it('should throw error when continueOnFail is false', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('get');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('123');
    mockExecuteFunctions.continueOnFail.mockReturnValue(false);
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

    await expect(executeLocationOperations.call(mockExecuteFunctions, [{ json: {} }])).rejects.toThrow('API Error');
  });
});
});
