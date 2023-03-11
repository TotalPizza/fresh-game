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