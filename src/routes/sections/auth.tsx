import { lazy } from 'react';
import { GuestGuard } from '../guards/GuestGuard';
import { paths } from '../paths';

const Login = lazy(() => import('@/pages/auth/LoginPage'));
const Register = lazy(() => import('@/pages/auth/RegisterPage'));

export const authRoutes = [
  {
    path: paths.login,
    element: (
      <GuestGuard>
        <Login />
      </GuestGuard>
    ),
  },
  {
    path: paths.register,
    element: (
      <GuestGuard>
        <Register />
      </GuestGuard>
    ),
  },
];