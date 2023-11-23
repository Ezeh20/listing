import prisma from "@/app/libs/prismadb"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" }
            },
            //if no emaill or password was entered it will throw an error
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials")
                }

                //check if the user exists
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                //if the user does not exist then throw an error
                if (!user || !user?.hashedPassword) {
                    throw new Error("Invalid credentials")
                }

                //check if the entered password matches that of the hashedPassword in the DB
                const isPasswordCorrect = await bcrypt.compare(credentials.password, user.hashedPassword)

                if (!isPasswordCorrect) {
                    throw new Error("Invalid credentials")
                }

                return user;
            }
        })
    ],
    pages: {
        signIn: "/",
    },
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)