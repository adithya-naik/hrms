import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { Auth0ProviderWrapper } from '@/lib/auth0';
import { Layout } from '@/components/Layout/Layout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import Unauthorized from '@/pages/Unauthorized';
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
  <Auth0ProviderWrapper>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="leaves" element={<div>My Leaves Page</div>} />
                <Route path="leaves/new" element={<div>Apply Leave Page</div>} />
                <Route path="team-leaves" element={
                  <ProtectedRoute roles={['MANAGER', 'HR', 'ADMIN']}>
                    <div>Team Leaves Page</div>
                  </ProtectedRoute>
                } />
                <Route path="leave-requests" element={
                  <ProtectedRoute roles={['MANAGER', 'HR', 'ADMIN']}>
                    <div>Leave Requests Page</div>
                  </ProtectedRoute>
                } />
                <Route path="reports" element={
                  <ProtectedRoute roles={['HR', 'ADMIN']}>
                    <div>Reports Page</div>
                  </ProtectedRoute>
                } />
                <Route path="users" element={
                  <ProtectedRoute roles={['HR', 'ADMIN']}>
                    <div>Users Page</div>
                  </ProtectedRoute>
                } />
                <Route path="settings" element={
                  <ProtectedRoute roles={['ADMIN']}>
                    <div>Settings Page</div>
                  </ProtectedRoute>
                } />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </Provider>
  </Auth0ProviderWrapper>
);

export default App;