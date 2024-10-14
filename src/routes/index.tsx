import { useRoutes, Outlet } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { mainRoutes } from './sections/main';
import { authRoutes } from './sections/auth';
import { dashboardRoutes } from './sections/dashboard';

export default function Router() {
  return useRoutes([
    {
      element: <MainLayout><Outlet /></MainLayout>,
      children: [
        ...mainRoutes,
        ...authRoutes,
        ...dashboardRoutes,
      ],
    },
  ]);
}
