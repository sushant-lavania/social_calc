import { getspreadsheet } from "@/lib/getSpreadSheet";
import { redirect } from "next/navigation";
import CollabSpreadsheetComponent from "@/components/CollabSpreadsheet";
export default async function Sheet({params}:{ params : {sheetid:string}}){

        const spreadsheet = await getspreadsheet(params.sheetid)
        console.log("Spreadsheet:", spreadsheet)    
        
        if(!spreadsheet?.id)redirect("/dashboard");
        return(
            <div className="h-screen">
                <CollabSpreadsheetComponent spreadsheet={spreadsheet} />
            </div>
        )
    
}