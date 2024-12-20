import { lazy } from 'react';
import { AuthGuard } from '../guards/AuthGuard';
import { paths } from '../paths';
import { Routes, Route } from 'react-router-dom';

const Dashboard = lazy(() => import('@/pages/dashboard/DashboardPage'));
const Profile = lazy(() => import('@/pages/dashboard/ProfilePage'));
const Settings = lazy(() => import('@/pages/dashboard/SettingsPage'));
const RequirementsPage = lazy(() => import('@/pages/dashboard/RequirementsPage'));

export const dashboardRoutes = [
    {
        path: `${paths.dashboard}/*`,
        element: (
            <AuthGuard>
                <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path="item/:id" element={<RequirementsPage />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="settings" element={<Settings />} />
                </Routes>
            </AuthGuard>
        ),
    },
];
