/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: {
      exclude: ['error']
    },
    styledComponents: {
      minify: true
    },
    emotion: {
      sourceMap: true,
      autoLabel: 'always',
      labelFormat: `[filename]`
    }
  },
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com', 'lh3.googleusercontent.com']
  }
}

module.exports = nextConfig
