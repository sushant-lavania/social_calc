"use client";

import { deleteSpreadsheet } from "@/lib/deleteSpreadsheet"; // Ensure this function is properly exported and callable from client components
import { Button } from "./ui/button";
import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface SpreadsheetListProps {
  id: string;
  name: string;
  updatedAt: string;
}

export default function SpreadsheetList({ id, name, updatedAt }: SpreadsheetListProps) {
  const [isPending, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    console.log("handle delete")
    setIsDeleting(true);
    try {
      await deleteSpreadsheet(id);
      toast("🗑️ Deleted Successfully")
    } catch (error) {
      console.error("Error deleting spreadsheet:", error);
      setIsDeleting(false); // Re-enable the button if there's an error
    }
  };

  return (
    <div className="flex justify-between w-full items-center">
      <Link className="w-full h-full" href={`/sheet/${id}`}>
        <div>
          <div>{name}</div>
          <div className="text-base">{updatedAt}</div>
        </div>
      </Link>
      <div>
        <Button 
          variant="destructive" 
          onClick={handleDelete} 
          disabled={isDeleting || isPending} // Disable button while deletion is in progress
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </div>
  );
}
