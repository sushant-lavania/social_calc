"use client";
import { Workbook } from "@fortune-sheet/react";
import "@fortune-sheet/react/dist/index.css";
import { useCallback, useEffect, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Spreadsheet } from "@prisma/client";
import { saveSheet } from "@/lib/saveSheet";
import { toast } from "sonner";

export default function SpreadsheetComponent({ spreadsheet }: { spreadsheet: Spreadsheet | null }) {
  const [SheetState, setSheetState] = useState(spreadsheet?.data);
  const [isPending, startTransition] = useTransition();
  const [isSaving, setIsSaving] = useState(false);
  

  function handleChange(data: any) {
    setSheetState(data);
    console.log("Data updated", SheetState);
  }

  const handleSave = () => {
    setIsSaving(true);
    startTransition(async () => {
      try {
        await saveSheet(spreadsheet?.id as string, SheetState);
        toast("successfully saved")
        console.log("Data saved");
      } catch (error) {
        console.error("Error saving data:", error);
      } finally {
        setIsSaving(false);
      }
    });
  };

  useEffect(() => {
    console.log("Spreadsheet data:", spreadsheet?.data);
  }, [spreadsheet]);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex justify-between px-3 py-1 items-center">
        <span className="text-xl">{spreadsheet?.name}</span>
        <Button onClick={handleSave} disabled={isSaving || isPending}>
          {isSaving || isPending ? "Saving..." : "Save"}
        </Button>
      </div>
      {SheetState && (
        <Workbook 
          onChange={handleChange}
          data={SheetState as any}
        />
      )}
    </div>
  );
}
