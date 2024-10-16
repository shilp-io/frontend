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
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <SidebarProvider>
        {isAuthenticated && <AppSidebar />}
        <main className="flex-grow container mx-auto px-4 py-8">
          {isAuthenticated && <SidebarTrigger />}
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
