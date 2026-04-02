import { ICredentialType, INodeProperties } from 'n8n-workflow';

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
			description: 'Your DEAR account identifier',
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
			description: 'API key generated from DEAR system settings',
		},
		{
			displayName: 'API Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://inventory.dearsystems.com/ExternalApi/v2',
			required: true,
			description: 'The base URL for the Cin7 Core API',
		},
	];
}