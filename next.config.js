/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.clerk.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '*.public.blob.vercel-storage.com',
            },
            // Add any other remote patterns you need to allow
        ],
    },
    env: {
        KV_REST_API_URL: process.env.KV_REST_API_URL,
        KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
        KV_REST_API_READ_ONLY_TOKEN: process.env.KV_REST_API_READ_ONLY_TOKEN,
    },
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.externals.push({
                '@react-pdf/renderer': 'commonjs @react-pdf/renderer',
            })
        }
        return config
    },
    // Add other Next.js configurations here if needed
};

module.exports = nextConfig;