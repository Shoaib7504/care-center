// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'care-village-app.lovable.app',
        pathname: '/**',
      },
      // add more entries here if your MongoDB image URLs
      // come from other hosts too (e.g. Cloudinary, S3, etc.)
    ],
  },
}

export default nextConfig