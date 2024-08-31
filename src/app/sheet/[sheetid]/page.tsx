
import { auth } from "@/auth";
import SpreadsheetComponent from "@/components/spreadsheet";
import { getspreadsheet } from "@/lib/getSpreadSheet";
import { redirect } from "next/navigation";
import { toast } from "sonner";



export default async function Sheet({params}:{ params : {sheetid:string}}){
    const session = await auth()
    const userEmail = session?.user?.email
    const spreadsheet = await getspreadsheet(params.sheetid)
    console.log("Spreadsheet:", spreadsheet)    
    
    if(!spreadsheet?.id)redirect("/dashboard");
    
    if (spreadsheet.createdBy !== userEmail && !spreadsheet.anyOneAllowed) {
        const isUserAllowed = spreadsheet.allowedUsers.includes(userEmail as string);
        if (!isUserAllowed) {
          redirect("/dashboard"); // Redirect to dashboard if user is not allowed
        }
    }
    
    return(
        <div className="h-screen">
            <SpreadsheetComponent spreadsheet={spreadsheet} />
        </div>
    )
    
}