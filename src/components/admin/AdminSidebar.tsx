import { Home, Users, Package, Settings, BarChart2, ClipboardList, MapPin, BookOpen, User, Menu } from "lucide-react";
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
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const adminMenuItems = [
  { title: "Dashboard", icon: Home, url: "/" },
  { title: "Products", icon: Package, url: "/products" },
  { title: "Orders", icon: ClipboardList, url: "/orders" },
  { title: "Users", icon: Users, url: "/users" },
  { title: "Locations", icon: MapPin, url: "/locations" },
  { title: "Dictionaries", icon: BookOpen, url: "/dictionaries" },
  { title: "Analytics", icon: BarChart2, url: "/analytics" },
  { title: "Settings", icon: Settings, url: "/settings" },
];

const collectorMenuItems = [
  { title: "Dashboard", icon: Home, url: "/" },
  { title: "Orders", icon: ClipboardList, url: "/orders" },
];

const getMenuItems = (role: UserRole) => {
  return role === 'admin' ? adminMenuItems : collectorMenuItems;
};

const MenuContent = ({ currentRole, handleRoleChange, onItemClick }: { 
  currentRole: UserRole; 
  handleRoleChange: (role: UserRole) => void;
  onItemClick?: () => void;
}) => {
  const menuItems = getMenuItems(currentRole);
  
  return (
    <>
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
                  <a 
                    href={item.url} 
                    className="flex items-center gap-2"
                    onClick={onItemClick}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <div className="mt-auto border-t p-4">
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
      </div>
    </>
  );
};

export function AdminSidebar() {
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem('userRole');
    return (savedRole as UserRole) || 'admin';
  });
  
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRoleChange = (newRole: UserRole) => {
    setCurrentRole(newRole);
    localStorage.setItem('userRole', newRole);
    toast({
      title: "View Changed",
      description: `Switched to ${newRole} view`,
    });
    
    if (newRole === 'admin') {
      navigate('/orders');
    }
    
    window.location.reload();
  };

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed bottom-4 left-4 z-50 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg w-12 h-12 flex items-center justify-center"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-[300px]">
          <MenuContent currentRole={currentRole} handleRoleChange={handleRoleChange} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sidebar>
      <SidebarContent>
        <MenuContent currentRole={currentRole} handleRoleChange={handleRoleChange} />
      </SidebarContent>
    </Sidebar>
  );
}