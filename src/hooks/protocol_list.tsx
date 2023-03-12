export interface Protocol{
    name: string;
    src: string;
}

export const protocols = [
    {   
        name: 'ETH', 
        protocols: [
            { 
                name: 'Nostra',
                src: '/fields/nostra.png',
            },
        ]
    },
    {   
        name: 'USDC', 
        protocols: [
            { 
                name: 'Nostra',
                src: '/fields/nostra.png',
            },
        ]
    }
];

export const protocol_addresses = [
    "0x", // Nostra
    "0x" // Yagi
]

export const protocol_lend_entry_points = [
    "mint", // Nostra
    "mint" // Yagi
]