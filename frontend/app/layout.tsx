import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Comic Publishing - Read & Share Manga',
  description: 'Discover and read amazing manga and comics online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
