"use server"
import { auth } from "@/auth";
import prisma from "./db";

export async function getUserdb(){
    try{
        const session = await auth()
        if(!session?.user?.email){
            return null
        }

        const user = await prisma.user.findUnique({
            where:{
                email: session.user.email
            }
        })
        return user
    }catch(error){
        console.log("error fetching user from db ", error)
        throw new Error("Failed to fetch user")
    }
}