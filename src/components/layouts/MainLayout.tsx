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
      <div className="flex min-h-screen w-full">
        <CustomSidebar />
        <main className={`flex-1 ${isMobile ? 'p-2' : 'p-4'} overflow-x-hidden bg-gray-100`}>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};