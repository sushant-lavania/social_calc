import prisma from "./db";

export async function getspreadsheet(spreadSheetId : string){
    try{
        const spreadsheet = prisma.spreadsheet.findUnique({
            where:{
                id:spreadSheetId
            }
        })
        return spreadsheet
    }catch(error){
        console.log("Error fetching a spreadsheet ",error)
        throw new Error("failed to fetch spreadsheet")
    }
}