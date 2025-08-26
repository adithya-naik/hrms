import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  user: {
    firstName?: string;
    lastName?: string;
    profileImage?: string | null;
  };
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-10 w-10',
  xl: 'h-12 w-12',
};

export function UserAvatar({ user, size = 'md', className }: UserAvatarProps) {
  const getInitials = () => {
    if (!user?.firstName && !user?.lastName) return 'U';
    return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
  };

  if (!user) {
    return (
      <Avatar className={cn(sizeClasses[size], className)}>
        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium">
          <User className="h-1/2 w-1/2" />
        </AvatarFallback>
      </Avatar>
    );
  }

  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      {user.profileImage && (
        <AvatarImage 
          src={user.profileImage} 
          alt={`${user.firstName} ${user.lastName}`}
          className="object-cover"
        />
      )}
      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium">
        {user.profileImage ? (
          <User className="h-1/2 w-1/2" />
        ) : (
          getInitials()
        )}
      </AvatarFallback>
    </Avatar>
  );
}
