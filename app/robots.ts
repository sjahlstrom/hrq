import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin', '/users', '/stats', '/analysis']
            }
        ],
        sitemap: 'http://hrq.vercel.app/sitemap.xml'
    }
}