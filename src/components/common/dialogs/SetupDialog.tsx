import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Upload } from 'lucide-react';

interface SetupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    title: string;
    objective: string;
    documents: File[];
  }) => void;
  initialData?: {
    title: string;
    objective: string;
  };
}

const SetupDialog: React.FC<SetupDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    objective: '',
    documents: [] as File[],
  });

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        title: initialData.title || '',
        objective: initialData.objective || '',
      }));
    }
  }, [initialData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        documents: [...Array.from(e.target.files || [])],
      }));
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Setup Requirements</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Name</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Project requirements name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="objective">Objective</Label>
            <Textarea
              id="objective"
              value={formData.objective}
              onChange={(e) => setFormData(prev => ({ ...prev, objective: e.target.value }))}
              placeholder="What are the main objectives of these requirements?"
              className="h-24"
            />
          </div>
          <div className="grid gap-2">
            <Label>Documents</Label>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <Label
                htmlFor="file-upload"
                className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-50"
              >
                <Upload className="h-4 w-4" />
                Upload Files
              </Label>
              <span className="text-sm text-gray-500">
                {formData.documents.length} files selected
              </span>
            </div>
            {formData.documents.length > 0 && (
              <ul className="text-sm text-gray-500">
                {formData.documents.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SetupDialog;