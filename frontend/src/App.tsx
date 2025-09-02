import React, { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store, RootState } from "@/store";
import { setCredentials } from "@/store/slices/authSlice";
import { Layout } from "@/components/Layout/Layout";

import Dashboard from "@/pages/Dashboard";
import ApplyLeave from "@/pages/Leaves/ApplyLeave";
import TeamLeaves from "@/pages/Leaves/TeamLeaves";
import Reports from "@/pages/Reports";
import Users from "@/pages/Users";
import Settings from "@/pages/Settings";
import Login from "@/pages/Login";
import Unauthorized from "@/pages/Unauthorized";
import NotFound from "@/pages/NotFound";
import ProfilePage from "@/pages/ProfilePage";
import NotificationsPage from "@/pages/NotificationsPage";
import ProjectManagement from "@/pages/ProjectManagement";
import TaskManagement from "@/pages/TaskManagement";
import TaskList from "@/pages/TaskList";
import TimesheetEmployee from "@/pages/TimesheetEmployee";
import TimesheetManager from "@/pages/timesheetManager";
import TimesheetHR from "@/pages/TimesheetHR";
import { useNotificationsSSE } from "@/hooks/useNotificationsSSE";

const queryClient = new QueryClient();

/** Hydrate user before rendering routes */
const AppWrapper: React.FC = () => {
  const [hydrated, setHydrated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // If token exists, hydrate user from localStorage (or call API to fetch user)
    const token = localStorage.getItem("auth_token");
    const refreshToken = localStorage.getItem("refresh_token");
    const user = localStorage.getItem("user");

    if (token && user) {
      dispatch(
        setCredentials({
          token,
          user: JSON.parse(user),
          refreshToken: refreshToken || undefined,
        })
      );
    }
    setHydrated(true);
  }, [dispatch]);

  if (!hydrated) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return <App />;
};

/** Top-level ProtectedRoute */
const ProtectedRoute: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useSelector((state: RootState) => state.auth);

  if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!user) return <Navigate to="/" replace />;

  return <>{children || <Outlet />}</>;
};

/** Role-based access */
const RoleGuard: React.FC<{ roles: string[]; children: React.ReactNode }> = ({ roles, children }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  if (!user || !roles.includes(user.role)) return <Navigate to="/unauthorized" replace />;
  return <>{children}</>;
};

const NotificationsSSEInitializer = () => {
  useNotificationsSSE();
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <NotificationsSSEInitializer />
        <Routes>
          {/* Public */}
          <Route path="/" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected App */}
          <Route path="/app" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />

            <Route path="leaves/new" element={<RoleGuard roles={["EMPLOYEE","MANAGER","HR"]}><ApplyLeave /></RoleGuard>} />
            <Route path="team-leaves" element={<RoleGuard roles={["MANAGER"]}><TeamLeaves /></RoleGuard>} />
            <Route path="leave-requests" element={<RoleGuard roles={["MANAGER","HR","ADMIN"]}><TeamLeaves /></RoleGuard>} />

            <Route path="projects" element={<RoleGuard roles={["ADMIN"]}><ProjectManagement /></RoleGuard>} />
            <Route path="notifications" element={<RoleGuard roles={["EMPLOYEE","MANAGER","HR"]}><NotificationsPage /></RoleGuard>} />
            <Route path="reports" element={<RoleGuard roles={["HR","ADMIN"]}><Reports /></RoleGuard>} />
            <Route path="users" element={<RoleGuard roles={["HR","ADMIN"]}><Users /></RoleGuard>} />
            <Route path="settings" element={<RoleGuard roles={["ADMIN"]}><Settings /></RoleGuard>} />

            <Route path="tasks" element={<RoleGuard roles={["MANAGER"]}><TaskManagement /></RoleGuard>} />
            <Route path="my-tasks" element={<RoleGuard roles={["EMPLOYEE"]}><TaskList /></RoleGuard>} />

            <Route path="timesheet" element={<RoleGuard roles={["EMPLOYEE"]}><TimesheetEmployee /></RoleGuard>} />
            <Route path="timesheet-manager" element={<RoleGuard roles={["MANAGER"]}><TimesheetManager /></RoleGuard>} />
            <Route path="timesheet-hr" element={<RoleGuard roles={["HR"]}><TimesheetHR /></RoleGuard>} />

            <Route path="me" element={<ProfilePage />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default () => (
  <Provider store={store}>
    <AppWrapper />
  </Provider>
);
