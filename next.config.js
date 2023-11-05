/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disableDevLogs: true,
  mode: process.env.NODE_ENV,
})

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },
}

module.exports = nextConfig