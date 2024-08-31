"use client";
import { Workbook } from "@fortune-sheet/react";
import "@fortune-sheet/react/dist/index.css";
import { useCallback, useEffect, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Spreadsheet } from "@prisma/client";
import { saveSheet } from "@/lib/saveSheet";
import { toast } from "sonner";
import AddUsersModal from "./AddUsersModal";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

const ydoc = new Y.Doc();
export default function CollabSpreadsheetComponent({ spreadsheet }: { spreadsheet: Spreadsheet | null }) {
  const [SheetState, setSheetState] = useState(spreadsheet?.data);
  const [isPending, startTransition] = useTransition();
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Yjs setup
  const provider = new WebsocketProvider("ws://localhost:1234",spreadsheet?.id, ydoc);
  const ySheetState = ydoc.getMap("sheet");

  useEffect(() => {
    // Initialize Yjs shared data
    ySheetState.set("data", spreadsheet?.data || []);
    setSheetState(ySheetState.get("data"));

    // Subscribe to Yjs updates
    ySheetState.observe(() => {
      setSheetState(ySheetState.get("data"));
    });

    return () => {
      // Disconnect Yjs provider when component unmounts
      provider.disconnect();
    };
  }, [spreadsheet]);

  function handleChange(data: any) {
    // Update Yjs shared state
    ySheetState.set("data", data);
  }

  const handleSave = () => {
    setIsSaving(true);
    startTransition(async () => {
      try {
        await saveSheet(spreadsheet?.id as string, SheetState);
        toast("Successfully Saved ✅");
        console.log("Data saved");
      } catch (error) {
        console.error("Error saving data:", error);
      } finally {
        setIsSaving(false);
      }
    });
  };

  const handleAddUser = (email: string) => {
    console.log("User added:", email);
    // Logic to add the user goes here
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
      
    
    </div>
  );
}
