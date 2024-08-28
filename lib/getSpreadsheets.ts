import prisma from "@/lib/db";
import { getUser } from "./getUser";

export async function getSpreadsheets(){
    const user= await getUser()
    if(user){
        const spreadsheets = await prisma.spreadsheet.findMany({
            where: {
                userid: user.id,
            },
        });
        return spreadsheets

    }

}