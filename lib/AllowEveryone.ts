"use server"
import prisma from "./db";

export async function AllowEveryone(spreadsheetid:string, alloweveryone:boolean){
    try{
        await prisma.spreadsheet.update({
            where:{
                id: spreadsheetid,
            },
            data:{
                anyOneAllowed : alloweveryone
            }
        })

    }catch(error){
        console.log("Error")
        throw new Error("Cannot change property")
    }
}