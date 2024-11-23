/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: '/api/:path*',
          headers: [
            {
              key: 'Access-Control-Allow-Origin',
              value: 'http://localhost:5173', // Allowing all origins, adjust this for security (e.g., 'http://localhost:5173')
            },
            {
              key: 'Access-Control-Allow-Methods',
              value: 'GET, POST, PUT, DELETE, OPTIONS', // Allow methods
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
  
