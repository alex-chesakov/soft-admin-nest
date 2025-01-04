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
import { useToast } from "@/components/ui/use-toast";

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
    if (savedAdmins) {
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
          <div className="space-y-4">
            {admins.length === 0 ? (
              <p className="text-muted-foreground">No admins found.</p>
            ) : (
              <div className="grid gap-4">
                {admins.map((admin, index) => (
                  <div
                    key={admin.id}
                    className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleEditClick(admin)}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-muted-foreground">
                        {index + 1}.
                      </span>
                      <div>
                        <p className="font-medium">{admin.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {admin.email}
                        </p>
                      </div>
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

export default Admins;