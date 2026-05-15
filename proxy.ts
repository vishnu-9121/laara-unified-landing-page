import NextAuth from "next-auth"
import { authConfig } from "./auth.config"

const { auth } = NextAuth(authConfig)

// Next.js 16 Proxy Convention
export const proxy = (req: any) => {
  console.log("Proxy running for:", req.nextUrl.pathname)
  return auth(req)
}
export default proxy

export const config = {
  // Only match /admin and other protected routes
  matcher: ['/admin/:path*'],
}
