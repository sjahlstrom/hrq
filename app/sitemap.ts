import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://hrq.vercel.app'

    const routes = [
        '',
        '/about',
        '/contact',
        '/analysis',
        '/services',
        '/Faq',
        '/tos',
        '/services',
        '/price',
        '/privacy',
        '/cta',
        '/profile',
        '/preferences'
    ]

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
    }))
}