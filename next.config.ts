import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ['192.168.1.201'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'los-project-images.s3.us-east-1.amazonaws.com',
        pathname: '/portfolio/**',
      },
      {
        protocol: 'https',
        hostname: 'los-project-images.s3.us-east-1.amazonaws.com',
        pathname: '/portfolio-2026/**',
      },
    ],
  },
};

export default nextConfig;
