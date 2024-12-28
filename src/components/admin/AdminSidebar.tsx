import { Home, Users, ShoppingCart, Settings, BarChart2, Package, ClipboardList } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserRole } from "@/types/user";

// For demo purposes, we'll hardcode the role. In a real app, this would come from auth context
const currentUserRole: UserRole = 'admin';

const getMenuItems = (role: UserRole) => {
  const baseItems = [
    { title: "Dashboard", icon: Home, url: "/" },
  ];

  const collectorItems = [
    { title: "Orders", icon: ClipboardList, url: "/orders" },
  ];

  const adminItems = [
    { title: "Orders List", icon: ClipboardList, url: "/orders" },
    { title: "Single Order", icon: ShoppingCart, url: "/orders/:id" },
    { title: "Products List", icon: Package, url: "/products" },
    { title: "Users", icon: Users, url: "/users" },
    { title: "Analytics", icon: BarChart2, url: "/analytics" },
    { title: "Settings", icon: Settings, url: "/settings" },
  ];

  return [...baseItems, ...(role === 'admin' ? adminItems : collectorItems)];
};

export function AdminSidebar() {
  const menuItems = getMenuItems(currentUserRole);

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary">Soft UI Admin</h1>
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
    </Sidebar>
  );
}