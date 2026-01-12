/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class Cin7CoreApi implements ICredentialType {
  name = 'cin7CoreApi';
  displayName = 'Cin7 Core API';
  documentationUrl = 'https://dearinventory.docs.apiary.io/';
  properties: INodeProperties[] = [
    {
      displayName: 'Account ID',
      name: 'accountId',
      type: 'string',
      default: '',
      required: true,
      description: 'Your Cin7 Core Account ID from API settings',
    },
    {
      displayName: 'Application Key',
      name: 'applicationKey',
      type: 'string',
      typeOptions: {
        password: true,
      },
      default: '',
      required: true,
      description: 'Your API Application Key from Cin7 Core API settings',
    },
    {
      displayName: 'Use V2 API',
      name: 'useV2Api',
      type: 'boolean',
      default: true,
      description: 'Whether to use V2 API endpoints (recommended). Disable for legacy V1 API.',
    },
  ];

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        'api-auth-accountid': '={{$credentials.accountId}}',
        'api-auth-applicationkey': '={{$credentials.applicationKey}}',
      },
    },
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{$credentials.useV2Api ? "https://inventory.dearsystems.com/ExternalApi/v2" : "https://inventory.dearsystems.com/ExternalApi"}}',
      url: '/me',
      method: 'GET',
    },
  };
}
