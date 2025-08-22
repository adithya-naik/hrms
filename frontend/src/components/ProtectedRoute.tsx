import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '@/store';

type Role = 'EMPLOYEE' | 'MANAGER' | 'HR' | 'ADMIN';

interface Props {
  children: React.ReactNode;
  roles?: Role[];
}

export const ProtectedRoute: React.FC<Props> = ({ children, roles }) => {
  const location = useLocation();
  const { isAuthenticated, user, loading } = useSelector((s: RootState) => s.auth);

  // ⏳ Optional: prevent flicker while checking auth
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // 🚫 Not logged in → go to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 🔑 Check role permissions
  if (roles && (!user || !roles.includes(user.role as Role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Authorized → render children
  return <>{children}</>;
};
