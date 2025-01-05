import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ItemStatusPopoverProps {
  status: string;
  statusColor: string;
  onStatusChange: (newStatus: string, adjustedQty?: number) => void;
  statuses: Array<{ id: string; name: string }>;
}

export const ItemStatusPopover = ({ 
  status, 
  statusColor, 
  onStatusChange, 
  statuses 
}: ItemStatusPopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleStatusClick = (newStatus: string) => {
    if (newStatus === "Collected Adjusted") {
      setIsConfirmOpen(true);
      setIsOpen(false); // Close the popover when showing confirmation
      return;
    }
    onStatusChange(newStatus);
    setIsOpen(false);
  };

  const handleConfirm = () => {
    onStatusChange("Collected Adjusted");
    setIsConfirmOpen(false);
  };

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            className="text-xs px-2 py-1 rounded inline-flex items-center gap-1 hover:opacity-90 transition-opacity"
            style={{ 
              backgroundColor: statusColor,
              color: 'white'
            }}
          >
            {status}
            <ChevronDown className="h-3 w-3" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-2">
          <div className="space-y-1">
            {statuses.map((statusItem) => (
              <button
                key={statusItem.id}
                className="w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-100"
                onClick={() => handleStatusClick(statusItem.name)}
              >
                {statusItem.name}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change Status to Collected Adjusted</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change the status to Collected Adjusted?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setIsConfirmOpen(false);
              setIsOpen(true); // Reopen the popover when canceling
              }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};