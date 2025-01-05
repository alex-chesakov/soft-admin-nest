import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Collector } from "@/types/user";
import { loadDictionaryItems } from "@/utils/dictionaryStorage";
import { useToast } from "@/hooks/use-toast";

interface CollectorInfoEditDialogProps {
  collector?: {
    name: string;
    phone: string;
    email: string;
    collectionWindow?: string;
  };
  onSave: (data: {
    name: string;
    phone: string;
    email: string;
    collectionWindow?: string;
  }) => void;
}

export const CollectorInfoEditDialog = ({
  collector,
  onSave,
}: CollectorInfoEditDialogProps) => {
  const [collectors, setCollectors] = useState<Collector[]>([]);
  const [selectedCollector, setSelectedCollector] = useState<string>("");
  const [phone, setPhone] = useState(collector?.phone || "");
  const [email, setEmail] = useState(collector?.email || "");
  const [collectionWindows, setCollectionWindows] = useState<{ id: string; name: string }[]>([]);
  const [selectedWindow, setSelectedWindow] = useState<string>(collector?.collectionWindow || "");
  const { toast } = useToast();

  useEffect(() => {
    // Load collectors from localStorage
    const savedCollectors = localStorage.getItem("collectors");
    if (savedCollectors) {
      const parsedCollectors: Collector[] = JSON.parse(savedCollectors);
      setCollectors(parsedCollectors);
      
      // If there's a current collector, find and set their ID
      if (collector?.name) {
        const currentCollector = parsedCollectors.find(
          c => `${c.name} ${c.lastName}` === collector.name
        );
        if (currentCollector) {
          setSelectedCollector(currentCollector.id);
          setPhone(currentCollector.phone);
          setEmail(currentCollector.email);
        }
      }
    }

    // Load collection windows from dictionary
    const windows = loadDictionaryItems('collection-windows');
    setCollectionWindows(windows);
  }, [collector]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedCollectorData = collectors.find(c => c.id === selectedCollector);
    
    if (selectedCollectorData) {
      onSave({
        name: `${selectedCollectorData.name} ${selectedCollectorData.lastName}`,
        phone: selectedCollectorData.phone,
        email: selectedCollectorData.email,
        collectionWindow: selectedWindow,
      });
    }
  };

  const handleCollectorChange = (value: string) => {
    setSelectedCollector(value);
    const selectedCollectorData = collectors.find(c => c.id === value);
    if (selectedCollectorData) {
      setPhone(selectedCollectorData.phone);
      setEmail(selectedCollectorData.email);
    }
  };

  const handleRemoveCollector = () => {
    onSave({
      name: "",
      phone: "",
      email: "",
      collectionWindow: "",
    });
    toast({
      title: "Collector removed",
      description: "The collector has been removed from this order",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Collector Information</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Select
              value={selectedCollector}
              onValueChange={handleCollectorChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a collector" />
              </SelectTrigger>
              <SelectContent>
                {collectors.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {`${c.name} ${c.lastName}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={phone}
              disabled
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              disabled
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="collectionWindow">Collection Window</Label>
            <Select
              value={selectedWindow}
              onValueChange={setSelectedWindow}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select collection window" />
              </SelectTrigger>
              <SelectContent>
                {collectionWindows.map((window) => (
                  <SelectItem key={window.id} value={window.name}>
                    {window.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Button type="submit" className="w-full">Save Changes</Button>
            <Button 
              type="button" 
              variant="destructive" 
              className="w-full"
              onClick={handleRemoveCollector}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remove Collector
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};