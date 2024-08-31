"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AddUsersModalProps {
  open: boolean;
  onClose: () => void;
  onAddUser: (email: string) => void;
}

export default function AddUsersModal({ open, onClose, onAddUser }: AddUsersModalProps) {
  const [email, setEmail] = useState("");

  const handleAdd = () => {
    onAddUser(email);
    setEmail("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
        </DialogHeader>
        <Input 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Enter user email" 
          className="mt-4" 
        />
        <DialogFooter>
          <Button onClick={handleAdd}>Add User</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
