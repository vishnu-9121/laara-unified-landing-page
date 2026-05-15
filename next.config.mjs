/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  transpilePackages: ["jose", "next-auth"],
  serverExternalPackages: ["@prisma/client", "bcryptjs"],
}

export default nextConfig
