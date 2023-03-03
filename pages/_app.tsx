import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import Web3Provider from '@/components/Web3Provider'
import { ENV } from 'utils/env'
import dynamic from 'next/dynamic'
import { AppWrapper } from '../components'

type ManagerProviderProps = {
  tokenAddress: `0x${string}`
  children: React.ReactNode
}

interface DynamicManagerProviderProps extends ManagerProviderProps {
  // Define any additional props that you want to pass to the ManagerProvider
}

const DynamicManagerProvider = dynamic(
  () => import('@public-assembly/dao-utils').then((module) => module.ManagerProvider),
  {
    ssr: false,
  }
) as React.FC<DynamicManagerProviderProps>

function ExampleApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextHead>
        <title>Public Assembly</title>
      </NextHead>
      <Web3Provider>
        <AppWrapper>
          <DynamicManagerProvider tokenAddress={ENV.TOKEN_ADDRESS as `0x${string}`}>
            {/* <GovernorProvider> */}
            <Component {...pageProps} />
            {/* </GovernorProvider> */}
          </DynamicManagerProvider>
        </AppWrapper>
      </Web3Provider>
    </>
  )
}
export default ExampleApp
