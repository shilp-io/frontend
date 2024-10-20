import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/app-sidebar";
import { useUser } from '@/context/UserContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { isAuthenticated } = useUser();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {isAuthenticated && <AppSidebar />}
        <div className="flex flex-col flex-1 w-full overflow-auto">
          <header className="flex-none border-b">
            <div className="flex items-center justify-between p-2">
              <SidebarTrigger />
              {/* Add any other header content here */}
            </div>
          </header>
          <main className="flex-1 min-h-0 w-full">
            <div className="h-full w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;