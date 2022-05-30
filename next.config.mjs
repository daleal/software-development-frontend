/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_S3_BUCKET || 'localhost'] 
  }
}

export default nextConfig
