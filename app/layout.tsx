'use client'

import './styles/globals.css'

import { Header } from '@/components/Header'
import { Drawer } from '@/components/Drawer'
import { TopProgressBar } from '@/components/TopProgressBar'
import { Providers } from './providers'

// export const metadata: Metadata = {
//   title: 'Flexible',
//   description: 'Create your own DAO interface.',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <TopProgressBar />
        <Providers>
          <Header />
          <Drawer />
          {children}
        </Providers>
      </body>
    </html>
  )
}
