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
  const [showQtyInput, setShowQtyInput] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const handleStatusClick = (newStatus: string) => {
    const isCollectedAdjusted = statuses.find(s => s.name === newStatus && s.id === "2");
    
    if (isCollectedAdjusted) {
      setShowQtyInput(true);
      setSelectedStatus(newStatus);
      return;
    }
    
    onStatusChange(newStatus);
    setIsOpen(false);
  };

  const handleAdjustedQtySave = () => {
    if (adjustedQty) {
      setIsConfirmOpen(true);
      setIsOpen(false);
    }
  };

  const handleConfirmStatusChange = () => {
    onStatusChange(selectedStatus, Number(adjustedQty));
    setAdjustedQty("");
    setShowQtyInput(false);
    setIsOpen(false);
    setIsConfirmOpen(false);
    setSelectedStatus("");
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
            {!showQtyInput ? (
              statuses.map((statusItem) => (
                <button
                  key={statusItem.id}
                  className="w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-100"
                  onClick={() => handleStatusClick(statusItem.name)}
                >
                  {statusItem.name}
                </button>
              ))
            ) : (
              <div className="space-y-2">
                <Input
                  type="number"
                  placeholder="Adjusted quantity"
                  value={adjustedQty}
                  onChange={(e) => setAdjustedQty(e.target.value)}
                  className="w-full"
                />
                <Button 
                  onClick={handleAdjustedQtySave}
                  className="w-full"
                  disabled={!adjustedQty}
                >
                  Save
                </Button>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Status Change</AlertDialogTitle>
            <AlertDialogDescription>
              Update Quantity
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setIsConfirmOpen(false);
              setIsOpen(true);
              }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmStatusChange}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};