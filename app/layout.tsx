import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { Analytics } from "@vercel/analytics/react"

config.autoAddCss = false

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Krispy Meme - Meme Generator",
  description: "Create and customize memes with our easy-to-use meme generator",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-primary text-primary-foreground py-4">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold">Krispy Meme</h1>
          </div>
        </header>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

