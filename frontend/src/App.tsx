import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { Layout } from '@/components/Layout/Layout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Dashboard from '@/pages/Dashboard';
import MyLeaves from '@/pages/Leaves/MyLeaves';
import ApplyLeave from '@/pages/Leaves/ApplyLeave';
import TeamLeaves from '@/pages/Leaves/TeamLeaves';
import Reports from '@/pages/Reports';
import Users from '@/pages/Users';
import Settings from '@/pages/Settings';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Unauthorized from '@/pages/Unauthorized';
import NotFound from '@/pages/NotFound';
import React from 'react';

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
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
                    <TeamLeaves />
                  </ProtectedRoute>
                }
              />
              <Route
                path="reports"
                element={
                  <ProtectedRoute roles={['HR', 'ADMIN']}>
                    <Reports />
                  </ProtectedRoute>
                }
              />
              <Route
                path="users"
                element={
                  <ProtectedRoute roles={['HR', 'ADMIN']}>
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route
                path="settings"
                element={
                  <ProtectedRoute roles={['ADMIN']}>
                    <Settings />
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
);

export default App;
