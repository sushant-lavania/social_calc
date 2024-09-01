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
import { Input } from "./ui/input";
import { IoIosArrowBack } from "react-icons/io";
import { ChangeTitle } from "@/lib/ChangeTitle";
import { useRouter } from "next/navigation";
import { auth } from "@/auth";

export default function SpreadsheetComponent({ spreadsheet , email }: { spreadsheet: Spreadsheet | null , email: string}) {
  const [SheetState, setSheetState] = useState(spreadsheet?.data);
  const [isPending, startTransition] = useTransition();
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Title, setTitle] = useState(spreadsheet?.name);
  const [anyOneAllowedState, setAnyOneAllowedState] = useState(spreadsheet?.anyOneAllowed); 
  const router = useRouter();


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

  const debouncedHandleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    const handler = setTimeout(() => {
      ChangeTitle(spreadsheet?.id as string, value);
    }, 300); // 300ms debounce time

    return () => {
      clearTimeout(handler);
    };
  }, []);

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
        <div className="flex">
          <Button className="ml-2" onClick={() => router.back()}><IoIosArrowBack /></Button>
          <Input  onChange={debouncedHandleTitleChange} maxLength={20} value={Title} className="text-xl ml-5 max-w-fit"></Input>
      </div>
        <div className="flex gap-x-2 items-center">
          {spreadsheet?.createdBy == email ?<Button onClick={() => setIsModalOpen(true)}>Add Users</Button>:<span className="text-sm">Created by: {email}</span> }
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
      
      {spreadsheet?.createdBy==email && (<AddUsersModal
        allowedUsers={spreadsheet?.allowedUsers as string[]}
        spreadsheetId={spreadsheet?.id as string}
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddUser={handleAddUser} 
        anyOneAllowed={spreadsheet?.anyOneAllowed as boolean}
        setAnyOneAllowedState={setAnyOneAllowedState}
        anyOneAllowedState={anyOneAllowedState as boolean}
      />)}
    </div>
  );
}