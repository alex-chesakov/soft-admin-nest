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
import { Edit2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Collector } from "@/types/user";

interface CollectorInfoEditDialogProps {
  collector?: {
    name: string;
    phone: string;
    email: string;
  };
  onSave: (data: {
    name: string;
    phone: string;
    email: string;
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
  }, [collector]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedCollectorData = collectors.find(c => c.id === selectedCollector);
    
    if (selectedCollectorData) {
      onSave({
        name: `${selectedCollectorData.name} ${selectedCollectorData.lastName}`,
        phone: selectedCollectorData.phone,
        email: selectedCollectorData.email,
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
          <Button type="submit" className="w-full">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};