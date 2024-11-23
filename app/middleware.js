import { NextResponse } from "next/server";

export function middleware(req) {
  const res = NextResponse.next();

  // Set CORS headers
  res.headers.set('Access-Control-Allow-Origin', '*'); // Replace '*' with specific origin in production
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle OPTIONS method (CORS preflight requests)
  if (req.method === 'OPTIONS') {
    res.headers.set('Access-Control-Max-Age', '86400'); // Cache preflight for 1 day
    return new Response(null, { status: 204, headers: res.headers });
  }

  return res;
}

export const config = {
  matcher: '/api/:path*', // Ensure this matches the API routes
};
