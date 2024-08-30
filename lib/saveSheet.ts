"use server"

import { Prisma } from "@prisma/client"
import prisma from "./db"

export const  saveSheet = async(id:string, SheetState:any) => {
    SheetState = JSON.parse(JSON.stringify(SheetState))
    console.log(SheetState)
    SheetState.forEach((obj: any) => {
        
        // Initialize celldata as an empty array directly on obj
        obj.celldata = [];
    
        for (let i = 0; i < obj.data.length; i++) {
            // Traverse in columns of obj.data
            for (let j = 0; j < obj.data[0].length; j++) {
                // If the cell is not empty, add to celldata
                if (obj.data[i][j]) {
                    obj.celldata.push({
                        r: i,
                        c: j,
                        v: obj.data[i][j]
                    });
                }
            }
        }
    
        // Remove the data key from obj
        delete obj.data;
    });
    
    console.log(SheetState);  // The changes should now be reflected in SheetState
    
    await prisma.spreadsheet.update(
        {
            where: { id },
            data: {
                data: SheetState as Prisma.JsonArray
            }
        }
    )
}