
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default NextAuth({
    adapter: PrismaAdapter(prisma),
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        // ...add more providers here
    ],
    callbacks: {
        async session({ session, user,task, token }) {
            session.user.task = task;
            session.userId = user.id;
            console.log(session);
            return session;
        },
    },
    secret: process.env.SECRET
});
