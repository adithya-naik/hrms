// src/App.tsx
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { Auth0ProviderWrapper } from '@/lib/auth0';
import { Layout } from '@/components/Layout/Layout';
import Dashboard from '@/pages/Dashboard';
import MyLeaves from '@/pages/Leaves/MyLeaves';
import ApplyLeave from '@/pages/Leaves/ApplyLeave';
import TeamLeaves from '@/pages/Leaves/TeamLeaves';
import Login from '@/pages/Login';
import Unauthorized from '@/pages/Unauthorized';
import NotFound from '@/pages/NotFound';
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const queryClient = new QueryClient();

// ✅ Fixed ProtectedRoute
const ProtectedRoute = ({ children, roles }: { children: React.ReactNode; roles?: string[] }) => {
  const { isAuthenticated, isLoading, user, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    loginWithRedirect();
    return null;
  }
console.log('User roles:', user , roles);
  // 🔑 Role-based protection (if roles passed in)
  if (roles && roles.length > 0) {
    const userRoles = Array.isArray(user?.['http://localhost:5173/roles']) ? user['http://localhost:5173/roles'] : [];
    const hasRole = roles.some(role => userRoles.includes(role));
console.log("user roles:", userRoles, "Required roles:", roles, "Has role:", hasRole);

    if (!hasRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
};

const App = () => (
  <Auth0ProviderWrapper>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="leaves" element={<MyLeaves />} />
                <Route path="leaves/new" element={<ApplyLeave />} />
                <Route
                  path="team-leaves"
                  element={
                    <ProtectedRoute roles={['MANAGER', 'HR', 'ADMIN']}>
                      <TeamLeaves />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="leave-requests"
                  element={
                    <ProtectedRoute roles={['MANAGER', 'HR', 'ADMIN']}>
                      <div>Leave Requests Page</div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="reports"
                  element={
                    <ProtectedRoute roles={['HR', 'ADMIN']}>
                      <div>Reports Page</div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="users"
                  element={
                    <ProtectedRoute roles={['HR', 'ADMIN']}>
                      <div>Users Page</div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="settings"
                  element={
                    <ProtectedRoute roles={['ADMIN']}>
                      <div>Settings Page</div>
                    </ProtectedRoute>
                  }
                />
              </Route>

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </Provider>
  </Auth0ProviderWrapper>
);

export default App;
