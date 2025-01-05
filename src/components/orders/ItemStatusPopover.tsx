import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  const [showQtyDialog, setShowQtyDialog] = useState(false);

  const handleStatusClick = (newStatus: string) => {
    if (newStatus === "Collected Adjusted") {
      setShowQtyDialog(true);
      setIsOpen(false);
      return;
    }
    onStatusChange(newStatus);
    setIsOpen(false);
  };

  const handleAdjustedQtySave = () => {
    if (adjustedQty) {
      onStatusChange("Collected Adjusted", Number(adjustedQty));
      setAdjustedQty("");
      setShowQtyDialog(false);
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

      <Dialog open={showQtyDialog} onOpenChange={setShowQtyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Adjusted Quantity</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 p-4">
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
        </DialogContent>
      </Dialog>
    </>
  );
};