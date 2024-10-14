import { lazy } from 'react';
import { AuthGuard } from '../guards/AuthGuard';
import { paths } from '../paths';

const Dashboard = lazy(() => import('@/pages/dashboard/DashboardPage'));
const Profile = lazy(() => import('@/pages/dashboard/ProfilePage'));
const Settings = lazy(() => import('@/pages/dashboard/SettingsPage'));

export const dashboardRoutes = [
  {
    path: paths.dashboard,
    element: (
      <AuthGuard>
        <Dashboard />
      </AuthGuard>
    ),
  },
  {
    path: paths.profile,
    element: (
      <AuthGuard>
        <Profile />
      </AuthGuard>
    ),
  },
  {
    path: paths.settings,
    element: (
      <AuthGuard>
        <Settings />
      </AuthGuard>
    ),
  },
];
