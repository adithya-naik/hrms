import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Upload, Trash2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useUploadProfilePictureMutation, useDeleteProfilePictureMutation } from '@/store/api/uploadApi';

interface ProfileImageManagerProps {
  user: {
    id: string;
    firstName?: string;
    lastName?: string;
    profileImage?: string | null;
  };
  onImageUpdate?: (newImageUrl: string | null) => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-10 w-10',
  xl: 'h-24 w-24',
};

export function ProfileImageManager({ 
  user, 
  onImageUpdate, 
  size = 'xl', 
  className 
}: ProfileImageManagerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const [uploadProfilePicture, { isLoading: isUploading }] = useUploadProfilePictureMutation();
  const [deleteProfilePicture, { isLoading: isDeleting }] = useDeleteProfilePictureMutation();

  const getInitials = () => {
    if (!user.firstName && !user.lastName) return 'U';
    return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please select an image file (JPG, PNG)',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please select an image smaller than 10MB',
        variant: 'destructive',
      });
      return;
    }

    await uploadImage(file);
  };

  const uploadImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const result = await uploadProfilePicture(formData).unwrap();
      
      toast({
        title: 'Success',
        description: 'Profile picture updated successfully',
      });

      onImageUpdate?.(result.url);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: 'Failed to upload profile picture. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const deleteImage = async () => {
    try {
      await deleteProfilePicture().unwrap();

      toast({
        title: 'Success',
        description: 'Profile picture removed successfully',
      });

      onImageUpdate?.(null);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: 'Delete failed',
        description: 'Failed to remove profile picture. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="relative">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="relative group cursor-pointer">
            <Avatar className={cn(sizeClasses[size], className)}>
              {user.profileImage && (
                <AvatarImage 
                  src={user.profileImage} 
                  alt={`${user.firstName} ${user.lastName}`}
                  className="object-cover"
                />
              )}
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="h-6 w-6 text-white" />
            </div>
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Profile Picture</DialogTitle>
            <DialogDescription>
              Upload a new profile picture or remove the current one.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center space-y-6">
            <Avatar className="h-32 w-32">
              {user.profileImage && (
                <AvatarImage 
                  src={user.profileImage} 
                  alt={`${user.firstName} ${user.lastName}`}
                  className="object-cover"
                />
              )}
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium text-2xl">
                {getInitials()}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col space-y-2 w-full">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading || isDeleting}
                className="w-full"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    {user.profileImage ? 'Change Picture' : 'Upload Picture'}
                  </>
                )}
              </Button>

              {user.profileImage && (
                <Button
                  variant="destructive"
                  onClick={deleteImage}
                  disabled={isUploading || isDeleting}
                  className="w-full"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Removing...
                    </>
                  ) : (
                    <>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove Picture
                    </>
                  )}
                </Button>
              )}
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Supported formats: JPG, PNG. Max size: 10MB
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
