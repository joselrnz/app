import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jose's AI & Data Engineering Portfolio",
    short_name: 'Jose AI Portfolio',
    description: "Jose's AI & Data Engineering Portfolio - Showcasing Machine Learning, Data Engineering, MLOps, and AI Infrastructure skills",
    start_url: '/',
    display: 'standalone',
    background_color: '#0d1117',
    theme_color: '#0d1117',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
