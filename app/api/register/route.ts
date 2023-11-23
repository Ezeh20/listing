import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb"


export const POST = async (request: NextRequest) => {
    const reqbody = await request.json()
    const { name, email, password } = reqbody

    //again check if the user already exists
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    //if the user already exists return a response
    if (user) {
        return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    //hash the passed password
    const hashedPassword = await bcrypt.hash(password, 12)
    
    try {
        //create a new user
        const User = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword
            }
        })
        return NextResponse.json({ message: "Account created successfully", user: User }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}