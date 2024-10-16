import { lazy } from 'react';
import { paths } from '../paths';

const Home = lazy(() => import('@/pages/HomePage'));
const About = lazy(() => import('@/pages/AboutPage'));
const NotFound = lazy(() => import('@/pages/NotFoundPage'));
export const mainRoutes = [
  {
    path: paths.root,
    element: <Home />,
  },
  {
    path: paths.about,
    element: <About />,
  },
  {
    path: paths.notFound,
    element: <NotFound />,
  }
];
