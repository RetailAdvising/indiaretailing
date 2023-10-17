/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: false,
 
  images:{
    domains:["indiaretailing.go1cms.com","https://","via.placeholder.com","vumbnail.com",'img.youtube.com'],
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
}

module.exports = nextConfig
// module.exports = {target: 'serverless'}
