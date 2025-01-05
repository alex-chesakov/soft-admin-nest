import { SidebarProvider } from "@/components/ui/sidebar";
import { CollectorSidebar } from "@/components/collector/CollectorSidebar";
import { CollectorMenuSidebar } from "@/components/collector/CollectorMenuSidebar";
import { useLocation } from "react-router-dom";

interface CollectorLayoutProps {
  children: React.ReactNode;
}

export const CollectorLayout = ({ children }: CollectorLayoutProps) => {
  const location = useLocation();
  const isOrdersRoute = location.pathname.startsWith("/orders");
  const isOrderDetailsRoute = location.pathname.match(/^\/orders\/[\w-]+$/);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-100">
        {isOrdersRoute && (
          isOrderDetailsRoute ? <CollectorMenuSidebar /> : <CollectorSidebar />
        )}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};