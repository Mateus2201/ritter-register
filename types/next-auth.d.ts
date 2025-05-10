// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      token: string;
      name?: string | null;
      email?: string | null;
    };
  }

  interface User {
    id: number;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    token: string;
  }
}
