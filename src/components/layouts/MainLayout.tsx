import { SidebarProvider } from "@/components/ui/sidebar";
import { CustomSidebar } from "@/components/custom/CustomSidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-100">
        <CustomSidebar />
        <main className={`flex-1 ${isMobile ? 'p-2' : 'p-4'} overflow-x-hidden`}>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};