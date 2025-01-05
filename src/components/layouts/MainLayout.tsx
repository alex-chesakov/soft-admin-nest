import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-100">
        <main className="flex-1 p-8">
          {children}
        </main>
        <AdminSidebar />
      </div>
    </SidebarProvider>
  );
};