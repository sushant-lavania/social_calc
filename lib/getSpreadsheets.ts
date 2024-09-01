import prisma from "@/lib/db";

import { getUserdb } from "./getUserdb";

export async function getSpreadsheets(){
    const user= await getUserdb()
    if(user){
        const spreadsheets = await prisma.spreadsheet.findMany({
            where: {
                userid: user.id,
            },
            orderBy: {
                updatedAt: "desc",
            }
        });
        return spreadsheets

    }
}