import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Collector } from "@/types/user";
import { useToast } from "@/components/ui/use-toast";
import { CollectorForm } from "@/components/collectors/CollectorForm";
import { CollectorsList } from "@/components/collectors/CollectorsList";

const defaultCollectors: Collector[] = [
  {
    id: "1",
    role: "collector",
    name: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    password: "password123",
    locations: ["New York", "Brooklyn"]
  },
  {
    id: "2",
    role: "collector",
    name: "Maria",
    lastName: "Garcia",
    email: "maria.garcia@example.com",
    phone: "+1 (555) 234-5678",
    password: "password123",
    locations: ["Los Angeles", "San Diego"]
  },
  {
    id: "3",
    role: "collector",
    name: "David",
    lastName: "Johnson",
    email: "david.johnson@example.com",
    phone: "+1 (555) 345-6789",
    password: "password123",
    locations: ["Chicago", "Milwaukee"]
  },
  {
    id: "4",
    role: "collector",
    name: "Sarah",
    lastName: "Wilson",
    email: "sarah.wilson@example.com",
    phone: "+1 (555) 456-7890",
    password: "password123",
    locations: ["Miami", "Orlando"]
  },
  {
    id: "5",
    role: "collector",
    name: "Michael",
    lastName: "Brown",
    email: "michael.brown@example.com",
    phone: "+1 (555) 567-8901",
    password: "password123",
    locations: ["Seattle", "Portland"]
  }
];

const Collectors = () => {
  const [collectors, setCollectors] = useState<Collector[]>([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCollector, setSelectedCollector] = useState<Partial<Collector>>({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    locations: [],
  });
  const { toast } = useToast();

  useEffect(() => {
    const savedCollectors = localStorage.getItem("collectors");
    if (savedCollectors) {
      setCollectors(JSON.parse(savedCollectors));
    } else {
      // If no collectors exist in localStorage, initialize with default collectors
      setCollectors(defaultCollectors);
      localStorage.setItem("collectors", JSON.stringify(defaultCollectors));
    }
  }, []);

  const handleCreateCollector = () => {
    if (!selectedCollector.name || !selectedCollector.lastName || !selectedCollector.email || !selectedCollector.password || !selectedCollector.phone) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    }

    const collector: Collector = {
      id: isEditing ? selectedCollector.id! : crypto.randomUUID(),
      role: "collector",
      name: selectedCollector.name,
      lastName: selectedCollector.lastName,
      email: selectedCollector.email,
      phone: selectedCollector.phone,
      password: selectedCollector.password!,
      locations: selectedCollector.locations || [],
    };

    const updatedCollectors = isEditing
      ? collectors.map((c) => (c.id === collector.id ? collector : c))
      : [...collectors, collector];

    setCollectors(updatedCollectors);
    localStorage.setItem("collectors", JSON.stringify(updatedCollectors));
    
    setOpen(false);
    setSelectedCollector({
      name: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      locations: [],
    });
    setIsEditing(false);
    
    toast({
      title: "Success",
      description: `Collector ${isEditing ? 'updated' : 'created'} successfully`,
    });
  };

  const handleEdit = (collector: Collector) => {
    setSelectedCollector(collector);
    setIsEditing(true);
    setOpen(true);
  };

  const handleDelete = (collectorId: string) => {
    const updatedCollectors = collectors.filter(collector => collector.id !== collectorId);
    setCollectors(updatedCollectors);
    localStorage.setItem("collectors", JSON.stringify(updatedCollectors));
    
    toast({
      title: "Success",
      description: "Collector deleted successfully",
    });
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setSelectedCollector({
        name: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        locations: [],
      });
      setIsEditing(false);
    }
    setOpen(open);
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Collectors Management</CardTitle>
          <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Create new collector
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {isEditing ? 'Edit Collector' : 'Create New Collector'}
                </DialogTitle>
              </DialogHeader>
              <CollectorForm
                collector={selectedCollector}
                setCollector={setSelectedCollector}
                onSubmit={handleCreateCollector}
                isEditing={isEditing}
              />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <CollectorsList
            collectors={collectors}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Collectors;