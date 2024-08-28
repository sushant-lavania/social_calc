import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, account, profile }) {
      const email = user.email;
      if (!email) return false;

      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      // If user does not exist, create a new user
      if (!existingUser) {
        await prisma.user.create({
          data: {
            email,
            name: user.name,
          },
        });
      }

      return true;
    },
  },
});