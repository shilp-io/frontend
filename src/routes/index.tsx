import React, { Suspense } from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { mainRoutes } from './sections/main';
import { authRoutes } from './sections/auth';
import { dashboardRoutes } from './sections/dashboard';
import { paths } from './paths';

export function LoadingScreen() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
        </div>
    );
}

export default function Router() {
    const routes = useRoutes([
        ...mainRoutes,
        ...authRoutes,
        ...dashboardRoutes,
    ]);

    const location = useLocation();
    const isDashboardRoute = dashboardRoutes.some(route => 
        location.pathname.startsWith(route.path || '')
    );

    return (
        <MainLayout isDashboardRoute={isDashboardRoute}>
            <Suspense fallback={<LoadingScreen />}>
                {routes}
            </Suspense>
        </MainLayout>
    );
}
