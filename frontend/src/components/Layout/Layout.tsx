import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar className="hidden md:block fixed left-0 top-0 h-full border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" />
        
        <div className="flex-1 md:pl-64">
          <Header />
          <main className="flex-1 space-y-4 p-8 pt-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}