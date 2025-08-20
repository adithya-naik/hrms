import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  Users, 
  Settings, 
  BarChart3,
  LogOut,
  User
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useAuth } from '@/hooks/useAuth';

const navigation = [
  {
    name: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
    roles: ['EMPLOYEE', 'MANAGER', 'HR', 'ADMIN'],
  },
  {
    name: 'My Leaves',
    href: '/leaves',
    icon: Calendar,
    roles: ['EMPLOYEE', 'MANAGER', 'HR', 'ADMIN'],
  },
  {
    name: 'Team Leaves',
    href: '/team-leaves',
    icon: Users,
    roles: ['MANAGER', 'HR', 'ADMIN'],
  },
  {
    name: 'Leave Requests',
    href: '/leave-requests',
    icon: FileText,
    roles: ['MANAGER', 'HR', 'ADMIN'],
  },
  {
    name: 'Reports',
    href: '/reports',
    icon: BarChart3,
    roles: ['HR', 'ADMIN'],
  },
  {
    name: 'Users',
    href: '/users',
    icon: Users,
    roles: ['HR', 'ADMIN'],
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['ADMIN'],
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);
  const { logout } = useAuth();

  const userNavigation = navigation.filter(item => 
    item.roles.includes(user?.role || 'EMPLOYEE')
  );
console.log("User Navigation",user)
  return (
    <div className={cn('pb-12 w-64', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center mb-6">
            <Calendar className="h-8 w-8 text-primary" />
            <h2 className="ml-2 text-lg font-semibold">Leave Portal</h2>
          </div>
          
          <div className="space-y-1">
            <ScrollArea className="h-[calc(100vh-300px)]">
              {userNavigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Button
                    key={item.name}
                    variant={isActive ? 'secondary' : 'ghost'}
                    className={cn(
                      'w-full justify-start',
                      isActive && 'bg-secondary'
                    )}
                    asChild
                  >
                    <Link to={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </Link>
                  </Button>
                );
              })}
            </ScrollArea>
          </div>
        </div>
        
        <div className="px-3 py-2 border-t">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.role}
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
}