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
            // Add any other remote patterns you need to allow
        ],
    },
    // Add other Next.js configurations here if needed
};

module.exports = nextConfig;