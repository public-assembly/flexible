import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import { AppWrapper } from '../components'
import Web3Provider from '@/components/Web3Provider'
import { ManagerProvider, GovernorProvider } from '@public-assembly/dao-utils'
import { ENV } from 'utils/env'

function ExampleApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextHead>
        <title>Public Assembly</title>
      </NextHead>
      <Web3Provider>
        <AppWrapper>
          {/* <ManagerProvider tokenAddress={ENV.DAO_ADDRESS}> */}
          {/* <GovernorProvider> */}
          <Component {...pageProps} />
          {/* </GovernorProvider> */}
          {/* </ManagerProvider> */}
        </AppWrapper>
      </Web3Provider>
    </>
  )
}
export default ExampleApp
