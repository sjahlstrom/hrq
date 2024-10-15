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

// index.js

// const { createSNICallback } = require('anchor-pki/auto-cert/sni-callback');
// const { TermsOfServiceAcceptor } = require('anchor-pki/auto-cert/terms-of-service-acceptor');
// const https = require('node:https');
//
// const app = (req, res) => {
//     // setup your app
// }
//
// const SNICallback = createSNICallback({
//     name: 'sni-callback',
//     tosAcceptors: TermsOfServiceAcceptor.createAny(),
//     cacheDir: 'tmp/acme'
//
//     // The following are defaults
//     //
//     // directoryUrl: process.env.ACME_DIRECTORY_URL,
//     // contact: process.env.ACME_CONTACT,
//     // externalAccountBinding: {
//     //   kid: process.env.ACME_KID,
//     //   hmacKey: process.env.ACME_HMAC_KEY
//     // },
//
// });
//
// https.createServer({SNICallback}, app).
// listen(process.env.HTTPS_PORT);
//
