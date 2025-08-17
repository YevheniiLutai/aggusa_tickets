// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'AGG USA Tickets',
  description: 'AGG USA Tickets — Official Ticketing Platform for Aesthetic Group Gymnastics Events',
  openGraph: {
    title: 'AGG USA Tickets',
    description: 'AGG USA Tickets — Official Ticketing Platform for Aesthetic Group Gymnastics Events',
    url: 'https://www.tickets.aggusafederation.com/',
    images: [
      {
        url: '/banner.jpg',
        width: 600,
        height: 315,
        alt: 'AGG USA Banner',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AGG USA Tickets',
    description: 'AGG USA Tickets — Official Ticketing Platform for Aesthetic Group Gymnastics Events',
    images: ['/banner.jpg'],
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}