"use client";
import { Workbook } from "@fortune-sheet/react";
import "@fortune-sheet/react/dist/index.css";
import { useCallback, useState } from "react";
import {Op} from "@fortune-sheet/core"
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Spreadsheet() {
    const onOp = useCallback((op: Op[]) => {
        console.log("operation is trigerred")
        op.forEach((operation)=>{
            console.log(operation)
        })
    }, []);
    return (
        <div className="h-screen">
            {/* <div className="flex justify-between p-2" >
                <div className="flex justify-between items-center">
                    Untitled
                    {rename? 
                    <div>
                        <Input className="border border-black"/>
                    </div>
                    :
                    <Button onClick={()=>{setrename(1)}}>Rename</Button>
                    }
                </div>
                <Button className="ml-2">Save</Button>
            </div> */}
            <Workbook 
            onOp={onOp}
            onChange={(e)=>{console.log(JSON.stringify(e))}}
            data={[
                {
                    name: "Cell",
                    color: "black",
                    id: "0",
                    status: 1,
                    order: 0,
                    hide: 0,
                    row: 50,
                    column: 26,
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
                }
        ]} />
        </div>
        
        
    );
}
