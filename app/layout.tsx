import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ՏԻԳ-ԳՈՌ - Հայկական Ռեստորան",
  description: "Ավանդական հայկական խորոված և շաուրմա՝ բնական բաղադրիչներով և սիրով պատրաստված",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hy" className="overflow-x-hidden">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
        <div className="overflow-x-hidden w-full">{children}</div>
        <Toaster />
      </body>
    </html>
  )
}
