import { Button } from "./ui/button"

interface SpreadsheetListprops{
    name: string
    updatedAt: string
}

export default function SpreadsheetList( {name,updatedAt}:SpreadsheetListprops ){
    return(
        <div  className=" flex justify-between w-full">
            <div>
                {name}
            </div>
            <div>
                {updatedAt}
            </div>
            <div>
                <Button variant={"destructive"}>Delete</Button>
            </div>
        </div>
    )
}