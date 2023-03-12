import { Protocol, Token } from '@/utils/interfaces';

export const protocols = [
    {   
        token: Token.ETH, 
        protocols: [Protocol.Nostra]
    },
    {   
        token: Token.USDC, 
        protocols: [Protocol.Nostra]
    }
];

export const protocol_addresses = [
    "0x", // Nostra
    "0x" // Yagi
]

export const protocol_name = [
    "Nostra", // Nostra
    "Yagi" // Yagi
]

export const protocol_farm_icon = [
    "/fields/nostra.png", // Nostra
    "/fields/yagi.png" // Yagi
]

export const protocol_lend_entry_points = [
    "mint", // Nostra
    "mint" // Yagi
]