import { Token } from '@/utils/interfaces';

export const tokens = [
    { token: Token.ETH, name: 'ETH', address: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7', decimals: '18', src: '/seeds/eth.png' },
    { token: Token.USDC, name: 'USDC', address: '0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8', decimals: '6', src: '/seeds/usdc.png' },
];

export const token_name = [
    'ETH', // ETH
    'USDC', // USDC
];

export const token_decimals = [
    18, // ETH
    6, // USDC
]

export const token_addresses = [
    '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7', // ETH
    '0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8', // USDC
];