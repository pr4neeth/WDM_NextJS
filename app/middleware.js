import { NextResponse,NextRequest } from "next/server";

export function middleware(req){
  const res = NextResponse.next();
  res.headers.append('ACCESS-ORIGIN-ALLOW-ORIGIN','*');
  return res;
}

export const config = {
  matches: ['/api/:path*']
}