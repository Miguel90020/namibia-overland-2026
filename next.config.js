/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['res.cloudinary.com'],
  },
}
module.exports = nextConfig
