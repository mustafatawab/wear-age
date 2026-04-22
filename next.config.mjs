/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    'vm-6hhyljlblaznrta7xb2dkzg7.vusercontent.net',
    'localhost:3000',
  ],
}

export default nextConfig
