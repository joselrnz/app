import type { Metadata } from 'next'
import '@/styles/globals.css'
import ThemeProvider from '@/components/ThemeProvider'
import { ProgressProvider } from '@/components/ProgressProvider'

export const metadata: Metadata = {
  title: "Jose's Cloud Engineering Portfolio",
  description: "Jose's Cloud Engineering Portfolio - Showcasing Multi-Cloud Infrastructure, DevOps, CI/CD Pipelines, and Cloud-Native Solutions",
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark-mode">
      <head>
        {/* TikZJax for rendering TikZ diagrams */}
        {/* Note: SRI hashes should be added when TikZJax provides stable versioned releases */}
        <link
          rel="stylesheet"
          type="text/css"
          href="https://tikzjax.com/v1/fonts.css"
          crossOrigin="anonymous"
        />
        <script
          src="https://tikzjax.com/v1/tikzjax.js"
          async
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <ProgressProvider>
            {children}
          </ProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
