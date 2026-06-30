import type { Metadata } from "next"
import { Playfair_Display, Montserrat } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Serenity Spa | Luxury Wellness & Holistic Relaxation",
  description: "Rejuvenate your mind, body, and soul at Serenity Spa. Book custom massages, facial treatments, and body scrubs in our tranquil sanctuary.",
  metadataBase: new URL("https://serenity-spa-omega.vercel.app"), // Placeholder for production URL
  openGraph: {
    title: "Serenity Spa | Luxury Wellness & Holistic Relaxation",
    description: "Rejuvenate your mind, body, and soul at Serenity Spa. Book custom massages, facial treatments, and body scrubs in our tranquil sanctuary.",
    siteName: "Serenity Spa",
    locale: "en_US",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable} scroll-smooth`}>
      <body className="antialiased min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
