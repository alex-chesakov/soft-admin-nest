import { Home, Users, Package, Settings, BarChart2, ClipboardList, MapPin, BookOpen } from "lucide-react";
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
import { useView } from "@/contexts/ViewContext";

export function AdminSidebar() {
  const { setViewType } = useView();
  
  const menuItems = [
    { title: "Dashboard", icon: Home, url: "/" },
    { title: "Products", icon: Package, url: "/products" },
    { title: "Orders", icon: ClipboardList, url: "/orders" },
    { title: "Customers", icon: Users, url: "/customers" },
    { title: "Users", icon: Users, url: "/users" },
    { title: "Locations", icon: MapPin, url: "/locations" },
    { title: "Dictionaries", icon: BookOpen, url: "/dictionaries" },
    { title: "Analytics", icon: BarChart2, url: "/analytics" },
    { title: "Settings", icon: Settings, url: "/settings" },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary">Store Admin</h1>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>View Type</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setViewType("admin")}
                >
                  Admin View
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setViewType("collector")}
                >
                  Collector View
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
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