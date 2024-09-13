/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: false,

  images: {
    domains: ["indiaretailing.go1cms.com", "https://", "via.placeholder.com", "vumbnail.com", 'img.youtube.com'],
    unoptimized: true,
    // loader: 'custom',
    // loaderFile: './components/ImageLoader.js'
  },
  // output: 'export'
  // sassOptions: {
  //   includePaths: ['./styles'],
  //   // includePaths: [path.join(__dirname, 'styles')],
  //   prependData: `@import "@styles/Variable.scss";`,
  // }
  swcMinify: false, // it should be false by default 
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' https://pagead2.googlesyndication.com https://accounts.google.com;
              frame-src 'self' https://accounts.google.com;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data:;
              connect-src 'self';
            `.replace(/\s{2,}/g, ' ').trim(),
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
// module.exports = {target: 'serverless'}
