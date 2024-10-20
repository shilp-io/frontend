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
      <div className="flex h-screen overflow-hidden">
        {isAuthenticated && <AppSidebar />}
        <div className="flex flex-col flex-1">
          <header className="flex-none border-b">
            <div className="flex items-center justify-between p-2">
              <SidebarTrigger />
              {/* Add any other header content here */}
            </div>
          </header>
          <main className="flex-1 min-h-0">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;