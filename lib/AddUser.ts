"use server"
import prisma from "./db";


export async function addUserToSpreadsheet(spreadsheetId: string, userEmail: string) {
  try {
    const spreadsheet = await prisma.spreadsheet.findUnique({
        where:{
            id: spreadsheetId
        },
        select:{
            allowedUsers:true
        }
    })
    if(!spreadsheet){
        throw new Error("Spreadsheet not found")
    }

    const updatedAllowedUsers = [...spreadsheet.allowedUsers, userEmail]
    await prisma.spreadsheet.update({
        where:{
            id: spreadsheetId,
        },
        data:{
            allowedUsers:updatedAllowedUsers
        }
    })

    console.log("User added to allowedUsers list");
  } catch (error) {
    console.error("Error adding user to allowedUsers list:", error);
    throw error;
  }
}
