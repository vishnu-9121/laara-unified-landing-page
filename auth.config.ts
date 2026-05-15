import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const authConfig = {
  providers: [
    Credentials({
      async authorize() {
        return null
      }
    }),
  ],
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig
