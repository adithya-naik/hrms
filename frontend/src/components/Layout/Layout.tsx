import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function Layout() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex flex-col flex-1 md:ml-64">
        <Header />
        <main className="p-6 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
