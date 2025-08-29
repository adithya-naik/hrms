import React from 'react';
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
import ProfilePage from './pages/ProfilePage';
import Landing from '@/pages/Landing'; // ✅ new landing page
import { useNotificationsSSE } from "@/hooks/useNotificationsSSE";
import NotificationsPage from './pages/NotificationsPage';
import ProjectManagement from '@/pages/ProjectManagement';
import TaskManagement from '@/pages/TaskManagement';


const queryClient = new QueryClient();
const NotificationsSSEInitializer = () => {
  useNotificationsSSE();
  return null; // doesn’t render anything
};
const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <NotificationsSSEInitializer />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} /> {/* ✅ Landing page */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected App Routes */}
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              {/* Dashboard → All roles */}
              <Route index element={<Dashboard />} />

              {/* My Leaves → EMPLOYEE, MANAGER, HR */}
              <Route
                path="leaves"
                element={
                  <ProtectedRoute roles={['EMPLOYEE', 'MANAGER', 'HR']}>
                    <MyLeaves />
                  </ProtectedRoute>
                }
              />

              {/* Apply Leave */}
              <Route
                path="leaves/new"
                element={
                  <ProtectedRoute roles={['EMPLOYEE', 'MANAGER', 'HR']}>
                    <ApplyLeave />
                  </ProtectedRoute>
                }
              />

              {/* Team Leaves */}
              <Route
                path="team-leaves"
                element={
                  <ProtectedRoute roles={['MANAGER']}>
                    <TeamLeaves />
                  </ProtectedRoute>
                }
              />

              {/* Leave Requests */}
              <Route
                path="leave-requests"
                element={
                  <ProtectedRoute roles={['MANAGER', 'HR', "ADMIN"]}>
                    <TeamLeaves />
                  </ProtectedRoute>
                }
              />


              <Route
                path="projects"
                element={
                 <ProtectedRoute roles={['ADMIN']}>
                    <ProjectManagement />
                  </ProtectedRoute>
                }
              />
              {/* notifications */} <Route path="notifications" element={<ProtectedRoute roles={['EMPLOYEE', 'MANAGER', 'HR']}> <NotificationsPage /> </ProtectedRoute>} />
              {/* Reports */}
              <Route
                path="reports"
                element={
                  <ProtectedRoute roles={['HR', 'ADMIN']}>
                    <Reports />
                  </ProtectedRoute>
                }
              />

              {/* Users */}
              <Route
                path="users"
                element={
                  <ProtectedRoute roles={['HR', 'ADMIN']}>
                    <Users />
                  </ProtectedRoute>
                }
              />

              {/* Settings */}
              <Route
                path="settings"
                element={
                  <ProtectedRoute roles={['ADMIN']}>
                    <Settings />
                  </ProtectedRoute>
                }
              />
               

               <Route
                  path="tasks"
                  element={
                     <ProtectedRoute roles={['MANAGER']}>
                         <TaskManagement />
                      </ProtectedRoute>
                  }
                 />

              {/* My Profile */}
              <Route path="/app/me" element={<ProfilePage />} />
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
