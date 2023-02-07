import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import { AppWrapper } from '../components'
import Web3Provider from '@/components/Web3Provider'

function ExampleApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextHead>
        <title>Public Assembly</title>
      </NextHead>
      <Web3Provider>
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </Web3Provider>
    </>
  )
}
export default ExampleApp
