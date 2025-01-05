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
import { Admin } from "@/types/user";
import { useToast } from "@/hooks/use-toast";
import { AdminsList } from "@/components/admins/AdminsList";

const defaultAdmins: Admin[] = [
  {
    id: "default-1",
    role: "admin",
    name: "John Smith",
    email: "john.smith@example.com",
    password: "admin123",
  },
  {
    id: "default-2",
    role: "admin",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    password: "admin123",
  },
  {
    id: "default-3",
    role: "admin",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    password: "admin123",
  },
  {
    id: "default-4",
    role: "admin",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    password: "admin123",
  },
  {
    id: "default-5",
    role: "admin",
    name: "David Wilson",
    email: "david.wilson@example.com",
    password: "admin123",
  },
];

const Admins = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    const savedAdmins = localStorage.getItem("admins");
    if (!savedAdmins || JSON.parse(savedAdmins).length === 0) {
      setAdmins(defaultAdmins);
      localStorage.setItem("admins", JSON.stringify(defaultAdmins));
    } else {
      setAdmins(JSON.parse(savedAdmins));
    }
  }, []);

  const handleCreateAdmin = () => {
    if (!newAdmin.name || !newAdmin.email || !newAdmin.password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    }

    const admin: Admin = {
      id: crypto.randomUUID(),
      role: "admin",
      name: newAdmin.name,
      email: newAdmin.email,
      password: newAdmin.password,
    };

    const updatedAdmins = [...admins, admin];
    setAdmins(updatedAdmins);
    localStorage.setItem("admins", JSON.stringify(updatedAdmins));
    
    setNewAdmin({ name: "", email: "", password: "" });
    setOpen(false);
    
    toast({
      title: "Success",
      description: "Admin created successfully",
    });
  };

  const handleEditClick = (admin: Admin) => {
    setSelectedAdmin(admin);
    setNewAdmin({
      name: admin.name,
      email: admin.email,
      password: admin.password,
    });
    setIsEditing(true);
    setOpen(true);
  };

  const handleUpdateAdmin = () => {
    if (!selectedAdmin) return;

    const updatedAdmins = admins.map((admin) =>
      admin.id === selectedAdmin.id
        ? {
            ...admin,
            name: newAdmin.name,
            email: newAdmin.email,
            password: newAdmin.password,
          }
        : admin
    );

    setAdmins(updatedAdmins);
    localStorage.setItem("admins", JSON.stringify(updatedAdmins));
    
    setNewAdmin({ name: "", email: "", password: "" });
    setSelectedAdmin(null);
    setIsEditing(false);
    setOpen(false);
    
    toast({
      title: "Success",
      description: "Admin updated successfully",
    });
  };

  const handleDeleteAdmin = (adminId: string) => {
    const updatedAdmins = admins.filter(admin => admin.id !== adminId);
    
    // Ensure we never delete all admins by restoring defaults if needed
    if (updatedAdmins.length === 0) {
      setAdmins(defaultAdmins);
      localStorage.setItem("admins", JSON.stringify(defaultAdmins));
      toast({
        title: "Info",
        description: "Default admins have been restored",
      });
      return;
    }

    setAdmins(updatedAdmins);
    localStorage.setItem("admins", JSON.stringify(updatedAdmins));
    
    toast({
      title: "Success",
      description: "Admin deleted successfully",
    });
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setNewAdmin({ name: "", email: "", password: "" });
      setSelectedAdmin(null);
      setIsEditing(false);
    }
    setOpen(open);
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Admins Management</CardTitle>
          <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Create new admin
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {isEditing ? "Edit Admin" : "Create New Admin"}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newAdmin.name}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, name: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Login (Email)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newAdmin.email}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, email: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newAdmin.password}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, password: e.target.value })
                    }
                  />
                </div>
                <Button onClick={isEditing ? handleUpdateAdmin : handleCreateAdmin}>
                  {isEditing ? "Update" : "Create"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <AdminsList 
            admins={admins} 
            onEdit={handleEditClick} 
            onDelete={handleDeleteAdmin}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Admins;