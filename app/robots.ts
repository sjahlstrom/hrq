import {MetadataRoute} from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin', '/users', '/stats', '/public']
            }
        ],
        sitemap: 'http://hrq.vercel.app/sitemap.xml'
    }
}