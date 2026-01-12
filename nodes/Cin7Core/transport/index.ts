/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
  IDataObject,
  IExecuteFunctions,
  IHookFunctions,
  IHttpRequestMethods,
  ILoadOptionsFunctions,
  IPollFunctions,
  IRequestOptions,
  JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

const V2_BASE_URL = 'https://inventory.dearsystems.com/ExternalApi/v2';
const V1_BASE_URL = 'https://inventory.dearsystems.com/ExternalApi';

/**
 * Make an authenticated request to the Cin7 Core API
 */
export async function cin7CoreApiRequest(
  this: IExecuteFunctions | ILoadOptionsFunctions | IPollFunctions | IHookFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body?: IDataObject,
  query?: IDataObject,
  useV1 = false,
): Promise<IDataObject> {
  const credentials = await this.getCredentials('cin7CoreApi');
  const useV2 = credentials.useV2Api !== false && !useV1;
  const baseUrl = useV2 ? V2_BASE_URL : V1_BASE_URL;

  const options: IRequestOptions = {
    method,
    uri: `${baseUrl}${endpoint}`,
    headers: {
      'api-auth-accountid': credentials.accountId as string,
      'api-auth-applicationkey': credentials.applicationKey as string,
      'Content-Type': 'application/json',
    },
    json: true,
  };

  if (body && Object.keys(body).length > 0) {
    options.body = body;
  }

  if (query && Object.keys(query).length > 0) {
    options.qs = query;
  }

  try {
    const response = await this.helpers.request(options);
    return response as IDataObject;
  } catch (error: unknown) {
    if (isApiError(error)) {
      if (error.statusCode === 429) {
        throw new NodeApiError(this.getNode(), {
          message: 'Rate limit exceeded. Please wait before making more requests.',
          description: 'The Cin7 Core API rate limit has been reached. Implement a delay before retrying.',
        });
      }

      if (error.statusCode === 401) {
        throw new NodeApiError(this.getNode(), {
          message: 'Authentication failed',
          description: 'Invalid Account ID or Application Key. Please check your credentials.',
        });
      }

      if (error.statusCode === 403) {
        throw new NodeApiError(this.getNode(), {
          message: 'Access forbidden',
          description: 'You do not have permission to access this resource.',
        });
      }

      if (error.statusCode === 404) {
        throw new NodeApiError(this.getNode(), {
          message: 'Resource not found',
          description: 'The requested resource was not found.',
        });
      }

      // Handle Cin7 Core specific error format
      const errorBody = error.error || error.body;
      if (errorBody && typeof errorBody === 'object' && 'Errors' in errorBody) {
        const errors = (errorBody as { Errors: string[] }).Errors;
        throw new NodeApiError(this.getNode(), {
          message: 'Cin7 Core API Error',
          description: Array.isArray(errors) ? errors.join(', ') : String(errors),
        });
      }

      throw new NodeApiError(this.getNode(), { message: error.message } as JsonObject);
    }

    throw error;
  }
}

interface IApiError extends Error {
  statusCode?: number;
  error?: IDataObject;
  body?: IDataObject;
}

function isApiError(error: unknown): error is IApiError {
  return error instanceof Error && 'statusCode' in error;
}

/**
 * Make a paginated request to retrieve all items
 */
export async function cin7CoreApiRequestAllItems(
  this: IExecuteFunctions | ILoadOptionsFunctions | IPollFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  propertyName: string,
  body?: IDataObject,
  query?: IDataObject,
): Promise<IDataObject[]> {
  const returnData: IDataObject[] = [];
  let page = 1;
  const limit = 100;

  query = query || {};
  query.Page = page;
  query.Limit = limit;

  let responseData: IDataObject;

  do {
    responseData = await cin7CoreApiRequest.call(this, method, endpoint, body, query);

    const items = responseData[propertyName];
    if (items && Array.isArray(items)) {
      returnData.push(...(items as IDataObject[]));
    }

    page++;
    query.Page = page;
  } while (
    responseData[propertyName] &&
    Array.isArray(responseData[propertyName]) &&
    (responseData[propertyName] as IDataObject[]).length === limit
  );

  return returnData;
}

/**
 * Build query parameters from additional fields, converting keys to PascalCase
 */
export function buildQueryFromFields(
  additionalFields: IDataObject,
  paramMappings?: Record<string, string>,
): IDataObject {
  const query: IDataObject = {};

  for (const [key, value] of Object.entries(additionalFields)) {
    if (value !== undefined && value !== null && value !== '') {
      // Use mapping if provided, otherwise convert camelCase to PascalCase
      const paramName = paramMappings?.[key] || key.charAt(0).toUpperCase() + key.slice(1);
      query[paramName] = value;
    }
  }

  return query;
}

/**
 * Format a date for the API (ISO 8601 format)
 */
export function formatDate(date: string | Date): string {
  if (typeof date === 'string') {
    return new Date(date).toISOString();
  }
  return date.toISOString();
}

/**
 * Parse and validate a GUID, throws error if invalid
 */
export function validateGuid(guid: string, fieldName = 'ID'): void {
  const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!guidRegex.test(guid)) {
    throw new Error(`Invalid GUID format for ${fieldName}: ${guid}`);
  }
}

/**
 * Handle API response with potential nested data
 */
export function extractResponseData(
  response: IDataObject,
  propertyName: string,
): IDataObject | IDataObject[] {
  if (response[propertyName] !== undefined) {
    return response[propertyName] as IDataObject | IDataObject[];
  }
  return response;
}

/**
 * Build line items for orders (sales, purchases, etc.)
 */
export function buildLineItems(lines: IDataObject[], _requiredFields?: string[]): IDataObject[] {
  return lines.map((line) => {
    const lineItem: IDataObject = {};

    // Convert all keys to PascalCase
    for (const [key, value] of Object.entries(line)) {
      if (value !== undefined && value !== null) {
        // Convert camelCase to PascalCase
        const pascalKey = key.charAt(0).toUpperCase() + key.slice(1);
        lineItem[pascalKey] = value;
      }
    }

    return lineItem;
  });
}

/**
 * Retry function with exponential backoff for rate limiting
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 5,
  initialDelay = 1000,
  maxDelay = 60000,
): Promise<T> {
  let retries = 0;
  let delay = initialDelay;

  while (retries < maxRetries) {
    try {
      return await fn();
    } catch (error: unknown) {
      if (isApiError(error) && error.statusCode === 429 && retries < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay = Math.min(delay * 2, maxDelay);
        retries++;
      } else {
        throw error;
      }
    }
  }

  throw new Error('Maximum retries exceeded');
}
