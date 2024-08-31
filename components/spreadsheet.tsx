"use client"
import { Workbook } from "@fortune-sheet/react";
import "@fortune-sheet/react/dist/index.css";
import { useCallback, useEffect, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Spreadsheet } from "@prisma/client";
import { saveSheet } from "@/lib/saveSheet";
import { toast } from "sonner";
import AddUsersModal from "./AddUsersModal";
import { addUserToSpreadsheet } from "@/lib/AddUser";

export default function SpreadsheetComponent({ spreadsheet }: { spreadsheet: Spreadsheet | null }) {
  const [SheetState, setSheetState] = useState(spreadsheet?.data);
  const [isPending, startTransition] = useTransition();
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleChange(data: any) {
    setSheetState(data);
    console.log("Data updated", SheetState);
  }

  const handleSave = () => {
    setIsSaving(true);
    startTransition(async () => {
      try {
        await saveSheet(spreadsheet?.id as string, SheetState);
        toast("Successfully Saved ✅")
        console.log("Data saved");
      } catch (error) {
        console.error("Error saving data:", error);
      } finally {
        setIsSaving(false);
      }
    });
  };

  const handleAddUser = async(email: string) => {
    console.log("User added:", email);
    if(!spreadsheet){
      toast("Error adding user")
      console.log("Spreadsheet undefined")
      return
    }
    await addUserToSpreadsheet(spreadsheet.id,email)
    toast("Added User")
    
  };

  useEffect(() => {
    console.log("Spreadsheet data:", spreadsheet?.data);
  }, [spreadsheet]);


  return (
    <div className="h-screen flex flex-col">
      <div className="flex justify-between px-3 py-1 items-center">
        <span className="text-xl">{spreadsheet?.name}</span>
        <div className="flex gap-x-2">
          <Button onClick={() => setIsModalOpen(true)}>Add Users</Button>
          <Button onClick={handleSave} disabled={isSaving || isPending}>
            {isSaving || isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
      {SheetState && (
        <Workbook 
          onChange={handleChange}
          data={SheetState as any}
        />
      )}
      
      <AddUsersModal
        allowedUsers={spreadsheet?.allowedUsers as string[]}
        spreadsheetId={spreadsheet?.id as string}
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddUser={handleAddUser} 
        anyOneAllowed={spreadsheet?.anyOneAllowed as boolean}
      />
    </div>
  );
}
