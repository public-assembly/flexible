export const platformThemeRegistryAbi = [
    { inputs: [], name: 'RequiresAdmin', type: 'error' },
    { inputs: [], name: 'RequiresHigherRole', type: 'error' },
    { inputs: [], name: 'RoleDoesntExist', type: 'error' },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'OwnershipTransferred',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'platformIndex',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'newTheme',
          type: 'string',
        },
      ],
      name: 'PlatformThemeUpdated',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'platformIndex',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'enum PlatformThemeRegistry.Roles',
          name: 'role',
          type: 'uint8',
        },
      ],
      name: 'RoleGranted',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'platformIndex',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'enum PlatformThemeRegistry.Roles',
          name: 'role',
          type: 'uint8',
        },
      ],
      name: 'RoleRevoked',
      type: 'event',
    },
    {
      inputs: [],
      name: 'contractDocs',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'platformIndex', type: 'uint256' },
      ],
      name: 'getPlatformTheme',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'platformIndex', type: 'uint256' },
        { internalType: 'address', name: 'account', type: 'address' },
      ],
      name: 'getRole',
      outputs: [
        {
          internalType: 'enum PlatformThemeRegistry.Roles',
          name: '',
          type: 'uint8',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'platformIndex', type: 'uint256' },
        {
          components: [
            { internalType: 'address', name: 'account', type: 'address' },
            {
              internalType: 'enum PlatformThemeRegistry.Roles',
              name: 'role',
              type: 'uint8',
            },
          ],
          internalType: 'struct PlatformThemeRegistry.RoleDetails[]',
          name: 'roleDetails',
          type: 'tuple[]',
        },
      ],
      name: 'grantRoles',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'name',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'account', type: 'address' },
        { internalType: 'string', name: 'uri', type: 'string' },
      ],
      name: 'newPlatformIndex',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'platformCounter',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'platformIndex', type: 'uint256' },
        { internalType: 'address[]', name: 'accounts', type: 'address[]' },
      ],
      name: 'revokeRoles',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'string', name: 'newContractDocs', type: 'string' },
      ],
      name: 'setContractDocs',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'platformIndex', type: 'uint256' },
        { internalType: 'string', name: 'uri', type: 'string' },
      ],
      name: 'setPlatformTheme',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'version',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
  ] as const;