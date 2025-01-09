import { SidebarProvider } from "@/components/ui/sidebar";
import { CustomSidebar } from "@/components/custom/CustomSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const currentRole = localStorage.getItem('userRole') || 'admin';
  const userName = currentRole === 'admin' ? 'Admin User' : 'Collector User';

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col">
        {isMobile && (
          <div className="fixed top-0 left-0 right-0 z-[999] flex items-center justify-between bg-white px-4 py-2 shadow-md dark:bg-gray-800">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="left" 
                className="w-[300px] p-0"
                style={{ 
                  zIndex: 99999,
                }}
              >
                <CustomSidebar />
              </SheetContent>
            </Sheet>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span className="text-sm font-medium">{userName}</span>
            </div>
          </div>
        )}
        {!isMobile && <CustomSidebar />}
        <main className={`flex-1 ${isMobile ? 'mt-14 p-2' : 'p-4'} overflow-x-hidden bg-gray-100`}>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};