import { SidebarProvider } from "@/components/ui/sidebar";
import { CollectorSidebar } from "@/components/collector/CollectorSidebar";
import { useLocation } from "react-router-dom";

interface CollectorLayoutProps {
  children: React.ReactNode;
}

export const CollectorLayout = ({ children }: CollectorLayoutProps) => {
  const location = useLocation();
  const isOrdersRoute = location.pathname.startsWith("/orders");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-100">
        {isOrdersRoute && <CollectorSidebar />}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};