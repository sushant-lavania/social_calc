"use client";

import React, { useTransition, useState } from 'react';
import { Button } from './ui/button';
import { createSpreadsheet } from '@/lib/createSpreadsheet';

export default function CreateNewSpreadsheet() {
  const [isPending, startTransition] = useTransition();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateSpreadsheet = () => {
    setIsCreating(true);
    startTransition(async () => {
      try {
        await createSpreadsheet();
        // Optionally refresh or navigate after creation
        window.location.reload(); // This will reload the page to show the new spreadsheet
      } catch (error) {
        console.error("Error creating spreadsheet:", error);
        setIsCreating(false); // Re-enable the button if there's an error
      }
    });
  };

  return (
    <Button onClick={handleCreateSpreadsheet} disabled={isPending || isCreating}>
      {isPending || isCreating ? "Creating Spreadsheet..." : "New Spreadsheet"}
    </Button>
  );
}
