import { authStorage } from '@/lib/authCookieManager';
import { Navigate } from 'react-router';
import React from 'react';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const Authenticated = authStorage.isAuthenticated();

  return Authenticated ? children : <Navigate to="/login" />;
}
