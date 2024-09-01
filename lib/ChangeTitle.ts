"use server"

import prisma from "./db";

export const ChangeTitle = async (spreadsheetId: string, title: string) => {

    await prisma.spreadsheet.update({
        where: {
        id: spreadsheetId,
        },
        data: {
        name: title,
        },
    });
    }