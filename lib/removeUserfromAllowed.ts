"use server";
import prisma from "./db";

export async function removeUserFromSpreadsheet(spreadsheetId: string, userEmail: string) {
  try {
    const spreadsheet = await prisma.spreadsheet.findUnique({
      where: {
        id: spreadsheetId,
      },
      select: {
        allowedUsers: true,
      },
    });

    if (!spreadsheet) {
      throw new Error("Spreadsheet not found");
    }

    // Filter out the user email from the allowedUsers list
    const updatedAllowedUsers = spreadsheet.allowedUsers.filter(user => user !== userEmail);

    await prisma.spreadsheet.update({
      where: {
        id: spreadsheetId,
      },
      data: {
        allowedUsers: updatedAllowedUsers,
      },
    });

    console.log("User removed from allowedUsers list");
  } catch (error) {
    console.error("Error removing user from allowedUsers list:", error);
    throw error;
  }
}
