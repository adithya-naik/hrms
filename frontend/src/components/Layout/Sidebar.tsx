import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Settings,
  BarChart3,
  LogOut,
  User,
  Menu,
  X,
  FileText,
  Bell,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useAuth } from "@/hooks/useAuth";
import { useIsMobile } from "@/hooks/use-mobile";

const navigation = [
  { name: "Dashboard", href: "/app", icon: LayoutDashboard, roles: ["EMPLOYEE", "MANAGER", "HR", "ADMIN"] },
  { name: "My Leaves", href: "/app/leaves", icon: Calendar, roles: ["EMPLOYEE", "MANAGER", "HR"] },
  { name: "Team Leaves", href: "/app/team-leaves", icon: Users, roles: ["MANAGER"] },
  { name: "Leave Requests", href: "/app/leave-requests", icon: FileText, roles: ["MANAGER", "HR","ADMIN"] },
  { name: "Reports", href: "/app/reports", icon: BarChart3, roles: ["HR", "ADMIN"] },
  { name: "Users", href: "/app/users", icon: Users, roles: ["HR", "ADMIN"] },
  { name: "Settings", href: "/app/settings", icon: Settings, roles: ["ADMIN"] },
  { name: "My Profile", href: "/app/me", icon: User, roles: ["EMPLOYEE", "MANAGER", "HR", "ADMIN"] },
  { name: "Notifications", href: "/app/notifications", icon: Bell, roles: ["EMPLOYEE", "MANAGER", "HR", "ADMIN"] },

];


export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ for redirect
  const { user } = useSelector((state: RootState) => state.auth);
  const { logout } = useAuth();
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);

  const allowedNavigation = navigation.filter(
    (item) => user && item.roles.includes(user.role)
  );

  // 🔹 Close mobile sidebar on route change
  React.useEffect(() => {
    if (isMobile) setOpen(false);
  }, [location.pathname, isMobile]);

  return (
    <>
      {/* Mobile Top Bar */}
      {isMobile && (
        <div className="flex items-center justify-between px-4 py-2 border-b bg-white fixed inset-x-0 top-0 z-50">
          <h2 className="text-lg font-semibold">Leave Portal</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "bg-white border-r pt-12 md:pt-4 transition-transform duration-300 z-40 shadow-md flex flex-col h-screen",
          isMobile
            ? cn(
                "fixed top-0 left-0 h-full w-64 overflow-auto",
                open ? "translate-x-0" : "-translate-x-full"
              )
            : "hidden md:flex md:fixed md:inset-y-0 md:left-0 md:w-64"
        )}
        aria-hidden={isMobile && !open}
      >
        {/* Logo/Header */}
        {!isMobile && (
          <div className="flex items-center p-4 mb-6 flex-shrink-0">
            <Calendar className="h-8 w-8 text-primary" />
            <h1 className="ml-2 text-xl font-semibold">Leave Portal</h1>
          </div>
        )}

        {/* Navigation */}
        <ScrollArea className="flex-1 px-2 overflow-y-auto">
          <nav className="space-y-1">
            {allowedNavigation.map((item) => {
              const active = location.pathname.startsWith(item.href);
              return (
                <Button
                  key={item.name}
                  variant={active ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  asChild
                >
                  <Link to={item.href} className="flex items-center">
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                </Button>
              );
            })}
          </nav>
        </ScrollArea>

        {/* User info + Logout */}
        <div className="mt-auto p-4 border-t flex-shrink-0">
          {/* 🔹 User Card → links to /me */}
          <Link
            to="/app/me"
            className="flex items-center gap-3 mb-4 hover:bg-muted p-2 rounded-lg transition"
          >
            <div className="flex-shrink-0 rounded-full bg-primary w-9 h-9 flex items-center justify-center text-primary-foreground font-bold">
              {user?.firstName ? (
                <>
                  {user.firstName[0]}
                  {user?.lastName?.[0]}
                </>
              ) : (
                <User className="w-5 h-5" />
              )}
            </div>
            <div className="min-w-0">
              <p className="font-semibold truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {user?.role}
              </p>
            </div>
          </Link>

          {/* Logout Button */}
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => {
              logout();       // clear auth state
              navigate("/");  // ✅ redirect after logout
            }}
          >
            <LogOut className="mr-2 h-5 w-5" /> Sign Out
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar Backdrop */}
      {isMobile && open && (
        <div
          className="fixed inset-0 z-30 bg-black/40"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
