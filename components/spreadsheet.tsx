"use client";
import { Workbook } from "@fortune-sheet/react";
import "@fortune-sheet/react/dist/index.css";
import { useCallback, useEffect, useState } from "react";
import {Op} from "@fortune-sheet/core"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Prisma, Spreadsheet } from "@prisma/client";
import { saveSheet } from "@/lib/saveSheet";


export default function SpreadsheetComponent({ spreadsheet }: { spreadsheet:Spreadsheet|null}) {
    const [SheetState, setSheetState] = useState(spreadsheet?.data)
    function renameKey ( obj:any, oldKey:any, newKey:any ) {
        obj[newKey] = obj[oldKey];
        delete obj[oldKey];
      }
    function handleChange(data: any) {
        // const arr = JSON.parse(JSON.stringify(data));
        // arr.forEach( (obj:any) => renameKey( obj, 'data', 'celldata' ) );
        // const updatedJson = JSON.stringify( arr );
        setSheetState(data)
        console.log(SheetState)
        console.log("data set")
    }

    useEffect(() => {
        console.log("spreadsheet ",spreadsheet?.data)
    },[])
    

    return (
        <div className="h-screen flex flex-col">
            <div className="flex justify-between px-3 py-1 items-center">
                <span className="text-xl">{spreadsheet?.name}</span>
                <Button onClick={()=>saveSheet(spreadsheet?.id as string,SheetState)}>Save</Button>
            </div>
            {SheetState&&(<Workbook 
                onChange={handleChange}
                data={SheetState as any}
                
            />)
            }
        </div>
        
        
    );
}
