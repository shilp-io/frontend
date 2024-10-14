import { lazy } from 'react';
import { paths } from '../paths';

const Home = lazy(() => import('@/pages/HomePage'));
const About = lazy(() => import('@/pages/AboutPage'));

export const mainRoutes = [
  {
    path: paths.root,
    element: <Home />,
  },
  {
    path: paths.about,
    element: <About />,
  },
];
