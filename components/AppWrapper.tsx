import { SWRConfig } from 'swr'
import { Header } from './Header'
import { TopProgressBar } from './TopProgressBar'

export function AppWrapper({ children }: { children: JSX.Element }) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
      }}
    >
      <TopProgressBar />
      <Header />
      {children}
    </SWRConfig>
  )
}
