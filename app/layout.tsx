'use client'

import './styles/globals.css'

import { Drawer } from '@/components/Drawer'
import { Header } from '@/components/Header'
import { TopProgressBar } from '@/components/TopProgressBar'
import { Providers } from './providers'

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
