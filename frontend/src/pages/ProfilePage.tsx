import * as React from "react";
import { useGetProfileQuery } from "@/store/api/authApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Briefcase, Mail, User as UserIcon } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function ProfilePage() {
const { data, isLoading, isError } = useGetProfileQuery(undefined, {
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
      <Card className="p-6 flex flex-col md:flex-row items-center md:items-start gap-6 shadow-lg">
        <Avatar className="h-24 w-24">
          {user.profileImage ? (
            <AvatarImage src={user.profileImage} alt={`${user.firstName} ${user.lastName}`} />
          ) : (
            <AvatarFallback>{initials || "U"}</AvatarFallback>
          )}
        </Avatar>

        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">
              {user.firstName} {user.lastName}
            </h2>
            <Badge variant={user.isActive ? "success" : "destructive"}>
              {user.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
          <p className="text-muted-foreground flex items-center gap-2">
            <Mail className="h-4 w-4" /> {user.email}
          </p>
          <p className="flex items-center gap-2">
            <UserIcon className="h-4 w-4" /> Role: {user.role}
          </p>
          <p className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" /> Department: {user.department?.name ?? "N/A"}
          </p>
          <p className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Joined:{" "}
            {user.joinDate ? new Date(user.joinDate).toLocaleDateString() : "N/A"}
          </p>
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
