/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'desoft-media-files.s3.amazonaws.com/'] 
  }
}

export default nextConfig
