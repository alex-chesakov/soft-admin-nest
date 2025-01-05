import { SidebarProvider } from "@/components/ui/sidebar";
import { CollectorSidebar } from "@/components/collector/CollectorSidebar";

interface CollectorLayoutProps {
  children: React.ReactNode;
}

export const CollectorLayout = ({ children }: CollectorLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-100">
        <CollectorSidebar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};