import prisma from "./db";

export async function getspreadsheet(spreadSheetId : string){
    try{
        const spreadsheet = await prisma.spreadsheet.findUnique({
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
export async function getspreadsheetAllowedAnyone(spreadSheetId :string){
    try{
        const spreadsheet = await prisma.spreadsheet.findUnique({
            where:{
                id:spreadSheetId
            }
        })
        return spreadsheet?.anyOneAllowed
    }catch(error){
        console.log("Error fetching a spreadsheet ",error)
        throw new Error("failed to fetch spreadsheet")
    }

}