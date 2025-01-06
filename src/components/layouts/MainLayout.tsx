import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useMobile } from "@/hooks/use-mobile";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const isMobile = useMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-100">
        <AdminSidebar />
        <main className={`flex-1 ${isMobile ? 'p-4' : 'p-8'} overflow-x-hidden`}>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};