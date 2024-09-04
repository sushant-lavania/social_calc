"use server"
import { revalidatePath } from "next/cache"
import prisma from "./db"
import { getUserdb } from "./getUserdb"
import { Prisma } from "@prisma/client"

export async function createSpreadsheet() {
    const defaultSpreadsheet = [{
        name: "Cell",
        color: "black",
        id: "0",
        status: 1,
        order: 0,
        hide: 0,
        row: 50,
        column: 52,
        defaultRowHeight: 23,
        defaultColWidth: 73,
        celldata: [],
        config: {
            merge: {} as Record<string, { r: number; c: number; rs: number; cs: number; }>,
            rowlen: {}, // Assuming it should be an object
            columnlen: {}, // Assuming it should be an object
            rowhidden: {}, // Assuming it should be an object
            colhidden: {}, // Assuming it should be an object
            borderInfo: [], // Assuming it should be an array
            authority: {}, // Assuming it should be an object
        },
        // scrollLeft: 0,
        // scrollTop: 315,
        luckysheet_select_save: [],
        calcChain: [],
        isPivotTable: true,
        pivotTable: {},
        filter_select: {
            row: [],
            column: [],
        },
        filter: undefined,
        // luckysheet_alternateformat_save: [],
        // luckysheet_alternateformat_save_modelCustom: [],
        // luckysheet_conditionformat_save: {},
        // frozen: {},
        // chart: [],
        zoomRatio: 1,
        // image: [],
        showGridLines: 1,
    }]
    console.log("new spreadsheet called")
    try{
        const user = await getUserdb()
        if(!user?.id){
            return null
        }
        await prisma.spreadsheet.create({
            data:{
                userid:user.id,
                name:"untitled",
                data:defaultSpreadsheet as Prisma.JsonArray,
                createdBy: user.email
            },
        })

        revalidatePath("/dashboard")
    }catch(error){
        console.log("Error creatting new sheet ", error)
        throw new Error("Failed to create new spreadsheet")
    }
}