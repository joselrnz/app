import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jose's Cloud Platform Engineering Portfolio",
    short_name: 'Jose Portfolio',
    description: "Jose's Cloud Platform Engineering Portfolio - Showcasing AI Infrastructure, Cloud Architecture, DevOps, and Platform Engineering",
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
