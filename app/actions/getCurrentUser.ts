import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import prisma from "@/app/libs/prismadb";

//get the current session form next-auth and attach it to our authOptions

export const getSession = async () => {
    return await getServerSession(authOptions)
}

//get the current user email from the session the use it to fetch the user from the db

export const getCurrentUser = async () => {
    try {
        //get the session
        const session = await getSession()
        //check if there is a session
        if (!session?.user?.email) {
            return null
        }
        //get the user from the db using the session email
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        })

        //check if there is a current user
        if (!currentUser) {
            return null
        }

        return currentUser;
    } catch (error: any) {
        return null
    }
}