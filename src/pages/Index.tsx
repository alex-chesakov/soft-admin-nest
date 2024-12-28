import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-100">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <AdminDashboard />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;