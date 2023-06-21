import './styles/globals.css'

import { Metadata } from 'next'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Flexible',
  description: 'Create your own DAO interface.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
