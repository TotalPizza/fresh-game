import HubAbi from '@/abis/hub.json'
import { Abi } from 'starknet'

export const contracts = [
    { id: '0', name: 'hub', address: '0x03c51eaee2f497d50531f1a70a6fe1bcb9f79c9f69d26a0b4319a682a77c03c8', abi: HubAbi as Abi },
];