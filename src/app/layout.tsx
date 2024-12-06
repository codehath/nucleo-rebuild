import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { NavBar } from "@/components/nav-bar"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nucleo Rebuild',
  description: 'A team-focused emotional intelligence app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 min-h-screen text-white`}>
        <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen">
          <main className="pb-20">
            {children}
          </main>
          <NavBar />
        </div>
      </body>
    </html>
  )
}

