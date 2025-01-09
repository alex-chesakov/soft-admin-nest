import { SidebarProvider } from "@/components/ui/sidebar";
import { CustomSidebar } from "@/components/custom/CustomSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const isMobile = useIsMobile();
  const [currentRole, setCurrentRole] = useState<'admin' | 'collector'>('admin');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    setCurrentRole((savedRole as 'admin' | 'collector') || 'admin');
  }, []);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {isMobile && (
          <div className="fixed top-0 left-0 right-0 h-14 bg-background border-b z-50 px-4 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <span className="font-medium capitalize">{currentRole}</span>
          </div>
        )}
        <CustomSidebar isOpen={isMenuOpen} onOpenChange={setIsMenuOpen} />
        <main className={`flex-1 ${isMobile ? 'pt-16 px-2' : 'p-4'} overflow-x-hidden bg-gray-100 dark:bg-gray-900`}>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};