"use server"
import { revalidatePath } from "next/cache"
import prisma from "./db"
import { getUserdb } from "./getUserdb"

export async function createSpreadsheet(){
    console.log("new spreadsheet called")
    try{
        const user = await getUserdb()
        if(!user?.id){
            return null
        }
        const newSpreadsheet = await prisma.spreadsheet.create({
            data:{
                userid:user.id,
                name:"untitled",
                sheets: {
                    create:[{
                        name:"sheet1",
                        order:0,
                        status:1,
                        rowCount:50,
                        columnCount:26,
                        defaultRowHeight:23,
                        defaultColWidth:73
                    }]
                }
            },
            include:{
                sheets:true
            }
        })

        revalidatePath("/dashboard")
    }catch(error){
        console.log("Error creatting new sheet ", error)
        throw new Error("Failed to create new spreadsheet")
    }
}