"use server"

import { revalidatePath } from "next/cache";
import prisma from "./db";

export async function deleteSpreadsheet(spreadsheetId : string) {
    console.log("delete spreadsheet called",spreadsheetId)
    try{
        const deletedSpreadsheet = await prisma.spreadsheet.delete({
            where:{
                id:spreadsheetId
            }
        })

        revalidatePath("/dashboard")
    }catch(error){
        console.log( error);
        throw new Error("error deleting spreadsheet")
    }
}