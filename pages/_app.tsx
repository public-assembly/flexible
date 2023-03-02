import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';
import { AppWrapper } from '../components';
import Web3Provider from '@/components/Web3Provider';
import { ManagerProvider, GovernorProvider } from '@public-assembly/dao-utils';
import { ENV } from 'utils/env';
// import { isServerSide } from 'utils/helpers';
import dynamic from 'next/dynamic';

type ManagerProviderProps = {
  tokenAddress: `0x${string}`;
  children: React.ReactNode;
};

interface DynamicManagerProviderProps extends ManagerProviderProps {
  // Define any additional props that you want to pass to the ManagerProvider
}

const DynamicManagerProvider = dynamic(
  () =>
    import('@public-assembly/dao-utils').then(
      (module) => module.ManagerProvider
    ),
  {
    ssr: false,
  }
) as React.FC<DynamicManagerProviderProps>;

function ExampleApp({ Component, pageProps }: AppProps) {
  // const tokenAddress =
  //   '0xdf9b7d26c8fc806b1ae6273684556761ff02d422' as `0x${string}`;
  // if (isServerSide()) return null;
  return (
    <>
      <NextHead>
        <title>Public Assembly</title>
      </NextHead>
      <Web3Provider>
        <AppWrapper>
          <DynamicManagerProvider
            tokenAddress={ENV.DAO_ADDRESS as `0x${string}`}
          >
            {/* <GovernorProvider> */}
            <Component {...pageProps} />
            {/* </GovernorProvider> */}
          </DynamicManagerProvider>
        </AppWrapper>
      </Web3Provider>
    </>
  );
}
export default ExampleApp;
