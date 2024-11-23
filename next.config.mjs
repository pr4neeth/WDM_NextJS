/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*', // Match all API routes
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // Allow all origins; replace with specific origin in production
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS', // Allow these HTTP methods
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization', // Allow specific headers
          },
        ],
      },
    ];
  },
};

export default nextConfig;
