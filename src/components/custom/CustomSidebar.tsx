import { Home, Users, Package, Settings, BarChart2, ClipboardList, MapPin, BookOpen, User, Menu } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
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

export function CustomSidebar() {
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem('userRole');
    return (savedRole as UserRole) || 'admin';
  });
  
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const navigate = useNavigate();
  const menuItems = getMenuItems(currentRole);

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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed bottom-4 left-4 z-[99999] bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg w-12 h-12 flex items-center justify-center"
          onClick={toggleMenu}
        >
          <Menu className="h-6 w-6" />
        </Button>
      )}
      <div 
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out z-[99998] ${
          isMobile && isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={toggleMenu} 
      />
      <Sidebar 
        className={`fixed inset-y-0 left-0 transition-transform duration-300 ease-in-out z-[99999] ${
          isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        <SidebarContent>
          <h1 className="text-2xl font-bold text-primary p-4">Store Admin</h1>
          <SidebarGroup>
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
    </>
  );
}