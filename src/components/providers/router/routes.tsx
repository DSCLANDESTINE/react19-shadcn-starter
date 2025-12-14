import Layout from '@/components/shared/Layout';
import Notfound from '@/components/shared/NotFound';
import ProtectedRoute from './ProtectedRoute';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';
const HomePage = lazy(() => import('@/features/home/HomePage'));
const LoginPage = lazy(() => import('@/features/Login/LoginPage'));

export const ALL_ROUTES = {
  home: '/',
  login: '/login',
  notFound: '*',
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: ALL_ROUTES.home,
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: ALL_ROUTES.login,
    element: <LoginPage />,
  },
  {
    path: ALL_ROUTES.notFound,
    element: <Notfound />,
  },
]);

export default router;
