import React from 'react';
import DashboardLayout from './DashboardLayout';
import PublicLayout from './PublicLayout';

interface MainLayoutProps {
  children: React.ReactNode;
  isDashboardRoute: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, isDashboardRoute }) => {
  return isDashboardRoute ? (
    <DashboardLayout>{children}</DashboardLayout>
  ) : (
    <PublicLayout>{children}</PublicLayout>
  );
};

export default MainLayout;
