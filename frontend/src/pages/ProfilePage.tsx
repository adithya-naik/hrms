import * as React from "react";
import { useGetProfileQuery } from "@/store/api/authApi";
import { useUploadProfilePictureMutation } from "@/store/api/uploadApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Briefcase, Calendar, Camera, Mail, User as UserIcon, Upload } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function ProfilePage() {
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [uploadProfilePicture, { isLoading: isUploading }] = useUploadProfilePictureMutation();
  const { data, isLoading, isError, refetch } = useGetProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <p className="p-6 text-center">Loading profile...</p>;
  }

  if (isError || !data?.user) {
    return (
      <p className="p-6 text-center text-red-500">
        Failed to load profile. Please try again.
      </p>
    );
  }

  // unwrap the actual user
  const user = data.user;

  // Safe initials
  const initials = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPG or PNG image",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await uploadProfilePicture(formData).unwrap();
      refetch(); // Refresh the profile data
      toast({
        title: "Success",
        description: "Profile picture updated successfully",
      });
    } catch (error) {
      console.error('Upload failed:', error);
      toast({
        title: "Upload failed",
        description: "Failed to update profile picture. Please try again.",
        variant: "destructive",
      });
    } finally {
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // Pie chart data
  const leaveData =
    user.leaveBalances?.map((lb: any) => ({
      name: lb.leavePolicy?.leaveType ?? "Unknown",
      value: lb.availableDays ?? 0,
    })) ?? [];

  const COLORS = ["#4f46e5", "#22c55e", "#f59e0b", "#ef4444", "#0ea5e9", "#9333ea"];

  return (
    <div className="p-6 space-y-6">
      {/* Profile Header */}
      <Card className="p-6 shadow-lg">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Avatar Section */}
          <div className="relative group">
            <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
              <Avatar className="h-32 w-32">
                {user.profileImage ? (
                  <AvatarImage 
                    src={user.profileImage} 
                    alt={`${user.firstName} ${user.lastName}`}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <AvatarFallback className="text-2xl bg-gray-200 w-full h-full flex items-center justify-center">
                    {user.firstName?.[0]}
                    {user.lastName?.[0]}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg, image/png"
                className="hidden"
              />
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold">
                {user.firstName} {user.lastName}
              </h2>
              <Badge variant={user.isActive ? "default" : "destructive"} className={user.isActive ? "bg-green-500 hover:bg-green-600" : ""}>
                {user.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              {user.email}
            </p>
            <p>
              Role: {user.role}
            </p>
            <p>
              Department: {user.department?.name ?? "N/A"}
            </p>
            <p>
              Joined: {user.joinDate ? new Date(user.joinDate).toLocaleDateString() : "N/A"}
            </p>
          </div>
        </div>
      </Card>


      {/* Department Info */}
      <Card>
        <CardHeader>
          <CardTitle>Department Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-medium">{user.department?.name ?? "N/A"}</p>
          <p className="text-muted-foreground">
            {user.department?.description ?? "No description available."}
          </p>
        </CardContent>
      </Card>

      {/* Manager & HR Info */}
      {/* Manager & HR Info */}
      {user.role !== "ADMIN" && (user.manager || user.hr) && (
        <Card>
          <CardHeader>
            <CardTitle>Reporting To</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Employee: Manager + HR */}
            {user.role === "EMPLOYEE" && (
              <>
                {user.manager && (
                  <div className="flex items-center gap-4">
                    <Avatar>
                      {user.manager.profileImage ? (
                        <AvatarImage src={user.manager.profileImage} alt="Manager" />
                      ) : (
                        <AvatarFallback>
                          {user.manager.firstName?.[0]}
                          {user.manager.lastName?.[0]}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <p className="font-semibold">Manager</p>
                      <p>
                        {user.manager.firstName} {user.manager.lastName}
                      </p>
                      <a
                        href={`mailto:${user.manager.email}`}
                        className="text-muted-foreground flex items-center gap-2 hover:underline"
                      >
                        <Mail className="h-4 w-4" /> {user.manager.email}
                      </a>
                    </div>
                  </div>
                )}

                {user.hr && (
                  <div className="flex items-center gap-4">
                    <Avatar>
                      {user.hr.profileImage ? (
                        <AvatarImage src={user.hr.profileImage} alt="HR" />
                      ) : (
                        <AvatarFallback>
                          {user.hr.firstName?.[0]}
                          {user.hr.lastName?.[0]}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <p className="font-semibold">HR</p>
                      <p>
                        {user.hr.firstName} {user.hr.lastName}
                      </p>
                      <a
                        href={`mailto:${user.hr.email}`}
                        className="text-muted-foreground flex items-center gap-2 hover:underline"
                      >
                        <Mail className="h-4 w-4" /> {user.hr.email}
                      </a>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Manager OR HR themselves: Show only HR */}
            {(user.role === "MANAGER" || user.role === "HR") && user.hr && (
              <div className="flex items-center gap-4">
                <Avatar>
                  {user.hr.profileImage ? (
                    <AvatarImage src={user.hr.profileImage} alt="HR" />
                  ) : (
                    <AvatarFallback>
                      {user.hr.firstName?.[0]}
                      {user.hr.lastName?.[0]}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="font-semibold">{user.role === "HR" ? "ADMIN" : "HR"}</p>
                  <p>
                    {user.hr.firstName} {user.hr.lastName}
                  </p>
                  <a
                    href={`mailto:${user.hr.email}`}
                    className="text-muted-foreground flex items-center gap-2 hover:underline"
                  >
                    <Mail className="h-4 w-4" /> {user.hr.email}
                  </a>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}


      {/* Leave Balances */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Balances</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Leave List */}
          <div className="space-y-4">
            {user.leaveBalances?.length ? (
              user.leaveBalances.map((lb: any) => (
                <div
                  key={lb.id}
                  className="p-4 border rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center"
                >
                  <div>
                    <h3 className="font-semibold">
                      {lb.leavePolicy?.leaveType ?? "Unknown"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Quota: {lb.totalQuota ?? 0} | Used: {lb.usedDays ?? 0} | Pending:{" "}
                      {lb.pendingDays ?? 0}
                    </p>
                  </div>
                  <Badge variant="outline" className="mt-2 md:mt-0">
                    Available: {lb.availableDays ?? 0}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No leave balances found.</p>
            )}
          </div>

          {/* Pie Chart */}
          <div className="flex justify-center items-center">
            {leaveData.length ? (
              <PieChart width={300} height={300}>
                <Pie
                  data={leaveData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {leaveData.map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            ) : (
              <p className="text-muted-foreground">No leave data for chart.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
