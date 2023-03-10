import React from 'react'
import NextHead from 'next/head'
import { Analytics } from '@vercel/analytics/react';
import { RpcProvider, RpcProviderOptions } from 'starknet'
import '@/styles/globals.css'
import { StarknetConfig, InjectedConnector } from '@starknet-react/core'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const infuraURL: RpcProviderOptions = {nodeUrl: "https://starknet-mainnet.infura.io/v3/a83025cd6f6246ae86cfe05ba6fe630e"}
  const provider = new RpcProvider(infuraURL)
  const connectors = [
    new InjectedConnector({ options: { id: 'braavos' }}),
    new InjectedConnector({ options: { id: 'argentX' }}),
  ]

  return (
    <StarknetConfig connectors={connectors} defaultProvider={provider}>
      <NextHead>
        <title>Commercium</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <meta name="description" content="The Commercium, providing on-chain DEX aggregation on StarkNet." />
        <link rel="icon" href='./images/favicon.png'/>
      </NextHead>
      <Component {...pageProps} />
      <Analytics/>
    </StarknetConfig>
  )
}
