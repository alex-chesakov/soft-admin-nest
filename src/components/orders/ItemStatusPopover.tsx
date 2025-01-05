import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
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
  const [adjustedQty, setAdjustedQty] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleStatusClick = (newStatus: string) => {
    if (newStatus === "Collected Adjusted") {
      setIsConfirmOpen(true);
      setIsOpen(false);
      return;
    }
    onStatusChange(newStatus);
    setIsOpen(false);
  };

  const handleConfirmAdjustedQty = () => {
    if (adjustedQty) {
      onStatusChange("Collected Adjusted", Number(adjustedQty));
      setAdjustedQty("");
      setIsConfirmOpen(false);
    }
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
            <AlertDialogTitle>Enter Adjusted Quantity</AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              <p>Please enter the adjusted quantity for this item:</p>
              <Input
                type="number"
                placeholder="Adjusted quantity"
                value={adjustedQty}
                onChange={(e) => setAdjustedQty(e.target.value)}
                className="w-full"
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setIsConfirmOpen(false);
              setAdjustedQty("");
            }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmAdjustedQty}
              disabled={!adjustedQty}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};