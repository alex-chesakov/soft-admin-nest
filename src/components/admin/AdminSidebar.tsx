import { Home, Users, Package, Settings, BarChart2, ClipboardList, MapPin, BookOpen, User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { UserRole } from "@/types/user";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

// For demo purposes, we'll hardcode the role. In a real app, this would come from auth context
const getMenuItems = (role: UserRole) => {
  const baseItems = [
    { title: "Dashboard", icon: Home, url: "/" },
  ];

  const collectorItems = [
    { title: "Orders", icon: ClipboardList, url: "/orders" },
  ];

  const adminItems = [
    { title: "Products", icon: Package, url: "/products" },
    { title: "Orders", icon: ClipboardList, url: "/orders" },
    { title: "Customers", icon: Users, url: "/customers" },
    { title: "Users", icon: Users, url: "/users" },
    { title: "Locations", icon: MapPin, url: "/locations" },
    { title: "Dictionaries", icon: BookOpen, url: "/dictionaries" },
    { title: "Analytics", icon: BarChart2, url: "/analytics" },
    { title: "Settings", icon: Settings, url: "/settings" },
  ];

  return [...baseItems, ...(role === 'admin' ? adminItems : collectorItems)];
};

export function AdminSidebar() {
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem('userRole');
    return (savedRole as UserRole) || 'admin';
  });
  
  const { toast } = useToast();
  const menuItems = getMenuItems(currentRole);

  const handleRoleChange = (newRole: UserRole) => {
    setCurrentRole(newRole);
    localStorage.setItem('userRole', newRole);
    toast({
      title: "View Changed",
      description: `Switched to ${newRole} view`,
    });
  };

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary">Store Admin</h1>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex gap-2">
          <button
            onClick={() => handleRoleChange('admin')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md transition-colors ${
              currentRole === 'admin'
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            }`}
          >
            <User className="h-4 w-4" />
            Admin
          </button>
          <button
            onClick={() => handleRoleChange('collector')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md transition-colors ${
              currentRole === 'collector'
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            }`}
          >
            <Users className="h-4 w-4" />
            Collector
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}