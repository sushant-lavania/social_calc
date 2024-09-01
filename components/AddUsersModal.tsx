"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { AllowEveryone } from "@/lib/AllowEveryone";
import { toast } from "sonner";
import { removeUserFromSpreadsheet } from "@/lib/removeUserfromAllowed";
import { getspreadsheetAllowedAnyone } from "@/lib/getSpreadSheet";

interface AddUsersModalProps {
  spreadsheetId: string;
  open: boolean;
  onClose: () => void;
  onAddUser: (email: string) => void;
  anyOneAllowed: boolean;
  allowedUsers: string[];
  anyOneAllowedState: boolean;
  setAnyOneAllowedState: (state: boolean) => void;
}

export default function AddUsersModal({
  allowedUsers,
  spreadsheetId,
  open,
  onClose,
  onAddUser,
  anyOneAllowed,
  anyOneAllowedState,
  setAnyOneAllowedState
}: AddUsersModalProps) {
  const [email, setEmail] = useState("");
  const [addedUsers, setAddedUsers] = useState<string[]>(allowedUsers);
  
  useEffect(() => {
    if (open) {
      setAnyOneAllowedState(anyOneAllowed);
    }
  }, [open, anyOneAllowed]);
  

  const handleAdd = () => {
    onAddUser(email);
    setAddedUsers([...addedUsers, email]);
    setEmail("");
  };

  const handleRemove = async (userEmail: string) => {
    try {
      await removeUserFromSpreadsheet(spreadsheetId, userEmail);
      setAddedUsers(addedUsers.filter((user) => user !== userEmail));
      toast(`${userEmail} removed from allowed users`);
    } catch (error) {
      toast("Something went wrong while removing the user");
      console.error("Error removing user:", error);
    }
  };

  const handleToggle = async () => {
    setAnyOneAllowedState(!anyOneAllowedState);
    try {
      await AllowEveryone(spreadsheetId, anyOneAllowedState);
      if (!anyOneAllowedState) {
        toast("Only users added can see this spreadsheet");
      } else {
        toast("Allowed everyone to see this spreadsheet");
      }
    } catch (error) {
      toast("Something went wrong");
      throw new Error("Cannot change");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
        </DialogHeader>
        <div className="flex items-center p-2 gap-x-3">
          <Input
            disabled={!anyOneAllowedState}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter user email"
            className="mt-4"
          />
          <Button
            className="mt-4"
            disabled={!anyOneAllowedState || email === ""}
            onClick={handleAdd}
          >
            Add
          </Button>
        </div>
        <div className="flex items-center mt-4">
          <Switch checked={!anyOneAllowedState} onCheckedChange={handleToggle} />
          <span className="ml-2">Allow Anyone</span>
        </div>
        {/* Render added users */}
        <div className="mt-4">
          {addedUsers.length > 0 && (
            <div>
              <h3 className="font-semibold">Added Users:</h3>
              <ul className="mt-2">
                {addedUsers.map((useremail, index) => (
                  <div key={index} className="flex items-center mt-2 justify-between">
                    <li>{useremail}</li>
                    <Button
                      variant="destructive"
                      onClick={() => handleRemove(useremail)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
