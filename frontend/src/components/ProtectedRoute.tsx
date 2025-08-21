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
  const { isAuthenticated, user } = useSelector((s: RootState) => s.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
