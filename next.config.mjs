/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [process.env.S3_BUCKET || 'localhost'] 
  }
}

export default nextConfig
