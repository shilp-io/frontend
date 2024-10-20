import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

interface SettingsDialogProps {
  title: string;
  objective: string;
  onEdit: () => void;
  onDelete: () => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  title,
  objective,
  onEdit,
  onDelete,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings - {title}</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <h3 className="text-sm font-medium mb-1">Objective</h3>
          <p className="text-sm text-muted-foreground mb-4">{objective || 'No objective set'}</p>
          
          <div className="flex flex-col space-y-2">
            <Button variant="outline" onClick={onEdit}>
              Edit Details
            </Button>
            <Button variant="destructive" onClick={onDelete}>
              Delete Requirements
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;