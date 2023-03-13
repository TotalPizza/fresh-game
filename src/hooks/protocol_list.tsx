import { Protocol, Token } from '@/utils/interfaces';

export const protocols = [
    {   
        token: Token.ETH, 
        protocols: [Protocol.Nostra],
        addresses: ["0x0553cea5d1dc0e0157ffcd36a51a0ced717efdadd5ef1b4644352bb45bd35453"]
    },
    {   
        token: Token.USDC, 
        protocols: [Protocol.Nostra],
        addresses: ["0x047e794d7c49c49fd2104a724cfa69a92c5a4b50a5753163802617394e973833"]
    }
];

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

export const protocol_farms_values = [
    [
        ["0.001", "0.002"], // ETH
        ["1.00", "5.00"], // USDC
    ], // Nostra
    [] // Yagi
]