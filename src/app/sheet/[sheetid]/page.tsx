import Spreadsheet from "@/components/spreadsheet";
import { getspreadsheet } from "@/lib/getSpreadSheet";


export default async function Sheet({params}:{ params : {sheetid:string}}){
    try{
        const spreadsheet = await getspreadsheet(params.sheetid)
        return(
            <div className="h-screen">
                {params.sheetid}
                <Spreadsheet />
            </div>
        )
    }catch(error){
        console.error("Error loading spreadsheet:", error);
        return <p>Failed to load spreadsheet</p>;
    }
}