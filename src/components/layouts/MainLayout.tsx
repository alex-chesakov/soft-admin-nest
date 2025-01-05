import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-100">
        <main className="flex-1 p-8 pr-[calc(25%+2rem)]">
          {children}
        </main>
        <div className="fixed right-0 top-0 h-full">
          <AdminSidebar />
        </div>
      </div>
    </SidebarProvider>
  );
};