import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://hrq.vercel.app'

    const routes = [
        '',
        '/about',
        '/analysis',
        '/services',
        '/FAQs',
        '/tos',
        '/price',
        '/privacy',
        '/cta',
    ]

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
    }))
}