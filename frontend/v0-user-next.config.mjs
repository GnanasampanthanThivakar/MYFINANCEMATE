/**
 * Next.js Configuration
 * This file configures Next.js behavior
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // API request proxy configuration
  // This redirects API requests from the frontend to the backend server
  async rewrites() {
    return [
      {
        // Any request to /api/* from the frontend
        source: '/api/:path*',
        
        // Will be forwarded to the backend server
        destination: 'http://localhost:5000/api/:path*',
      },
    ];
  },
};

export default nextConfig;

