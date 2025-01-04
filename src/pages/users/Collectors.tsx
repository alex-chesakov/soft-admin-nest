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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Collector } from "@/types/user";
import { useToast } from "@/components/ui/use-toast";
import { defaultLocations } from "@/types/location";
import { Checkbox } from "@/components/ui/checkbox";

const Collectors = () => {
  const [collectors, setCollectors] = useState<Collector[]>([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCollector, setSelectedCollector] = useState<Collector | null>(null);
  const [newCollector, setNewCollector] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    locations: [] as string[],
  });
  const { toast } = useToast();

  useEffect(() => {
    const savedCollectors = localStorage.getItem("collectors");
    if (savedCollectors) {
      setCollectors(JSON.parse(savedCollectors));
    }
  }, []);

  const handleCreateCollector = () => {
    if (!newCollector.name || !newCollector.lastName || !newCollector.email || !newCollector.password || !newCollector.phone) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    }

    const collector: Collector = {
      id: crypto.randomUUID(),
      role: "collector",
      name: newCollector.name,
      lastName: newCollector.lastName,
      email: newCollector.email,
      phone: newCollector.phone,
      password: newCollector.password,
      locations: newCollector.locations,
    };

    const updatedCollectors = [...collectors, collector];
    setCollectors(updatedCollectors);
    localStorage.setItem("collectors", JSON.stringify(updatedCollectors));
    
    setNewCollector({ name: "", lastName: "", email: "", phone: "", password: "", locations: [] });
    setOpen(false);
    
    toast({
      title: "Success",
      description: "Collector created successfully",
    });
  };

  const handleLocationChange = (locationId: string) => {
    setNewCollector(prev => ({
      ...prev,
      locations: prev.locations.includes(locationId)
        ? prev.locations.filter(id => id !== locationId)
        : [...prev.locations, locationId]
    }));
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setNewCollector({ name: "", lastName: "", email: "", phone: "", password: "", locations: [] });
      setSelectedCollector(null);
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
                <DialogTitle>Create New Collector</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">First Name</Label>
                  <Input
                    id="name"
                    value={newCollector.name}
                    onChange={(e) =>
                      setNewCollector({ ...newCollector, name: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={newCollector.lastName}
                    onChange={(e) =>
                      setNewCollector({ ...newCollector, lastName: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Login (Email)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newCollector.email}
                    onChange={(e) =>
                      setNewCollector({ ...newCollector, email: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={newCollector.phone}
                    onChange={(e) =>
                      setNewCollector({ ...newCollector, phone: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newCollector.password}
                    onChange={(e) =>
                      setNewCollector({ ...newCollector, password: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Locations</Label>
                  <div className="grid gap-2">
                    {defaultLocations.map((location) => (
                      <div key={location.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`location-${location.id}`}
                          checked={newCollector.locations.includes(location.id)}
                          onCheckedChange={() => handleLocationChange(location.id)}
                        />
                        <Label htmlFor={`location-${location.id}`}>{location.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <Button onClick={handleCreateCollector}>Create</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {collectors.length === 0 ? (
              <p className="text-muted-foreground">No collectors found.</p>
            ) : (
              <div className="grid gap-4">
                {collectors.map((collector, index) => (
                  <div
                    key={collector.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{`${collector.name} ${collector.lastName}`}</p>
                      <p className="text-sm text-muted-foreground">
                        {collector.email}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {collector.phone}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Locations: {collector.locations.map(id => 
                          defaultLocations.find(l => l.id === id)?.name
                        ).join(', ')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Collectors;