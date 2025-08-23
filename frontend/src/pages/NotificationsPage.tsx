import {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
  useDeleteNotificationMutation,
} from "@/store/api/notificationApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle2, XCircle, Info, BellOff } from "lucide-react";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

export default function NotificationsPage() {
  const { data: notifications = [], isLoading, refetch } =
    useGetNotificationsQuery();
  const [markAsRead] = useMarkAsReadMutation();
  const [markAllAsRead] = useMarkAllAsReadMutation();
  const [deleteNotification] = useDeleteNotificationMutation();
  const [filter, setFilter] = useState("all");
  const { toast } = useToast();

  const handleMarkAll = async () => {
    try {
      await markAllAsRead().unwrap();
      await refetch();
      toast({ title: "All notifications marked as read ✅" });
    } catch (err) {
      toast({ title: "Failed to mark all as read", variant: "destructive" });
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      await markAsRead({ id }).unwrap();
      await refetch();
      toast({ title: "Notification marked as read" });
    } catch (err) {
      toast({ title: "Failed to mark as read", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNotification({ id }).unwrap();
      await refetch();
      toast({ title: "Notification deleted 🗑️" });
    } catch (err) {
      toast({ title: "Failed to delete notification", variant: "destructive" });
    }
  };

  const filtered = notifications.filter((n) => {
    if (filter === "unread") return !n.isRead;
    if (filter === "approved") return n.type === "success";
    if (filter === "rejected") return n.type === "error";
    if (filter === "submitted") return n.title?.includes("Submitted");
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="text-green-500" size={20} />;
      case "error":
        return <XCircle className="text-red-500" size={20} />;
      default:
        return <Info className="text-blue-500" size={20} />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Notifications</h1>
        {notifications.length > 0 && (
          <Button variant="outline" size="sm" onClick={handleMarkAll}>
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Filters */}
      <Tabs defaultValue="all" onValueChange={(val) => setFilter(val)}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Content */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 py-12">
          <BellOff className="w-10 h-10 mb-2" />
          <p className="text-sm">No notifications found</p>
        </div>
      ) : (
        <ScrollArea className="h-[70vh] rounded-md border p-4">
          {filtered.map((n, i) => (
            <div key={n.id}>
              <Card
                className={`transition hover:bg-gray-50 ${
                  !n.isRead ? "border-blue-400" : "opacity-90"
                }`}
              >
                <CardHeader className="flex flex-row justify-between items-start p-4">
                  <div className="flex items-center gap-2">
                    {getIcon(n.type)}
                    <CardTitle
                      className={`text-base ${
                        !n.isRead ? "font-bold" : "font-medium"
                      }`}
                    >
                      {n.title}
                    </CardTitle>
                    {!n.isRead && (
                      <Badge variant="secondary" className="ml-2">
                        New
                      </Badge>
                    )}
                  </div>

                  {/* Quick actions */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="ghost">
                        ⋮
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {!n.isRead && (
                        <DropdownMenuItem onClick={() => handleMarkRead(n.id)}>
                          Mark as Read
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDelete(n.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>

                <CardContent className="p-4 pt-0 space-y-1">
                  <p className="text-sm">{n.message}</p>
                  <span className="text-xs text-gray-400">
                    {formatDistanceToNow(new Date(n.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </CardContent>
              </Card>

              {i < filtered.length - 1 && <Separator className="my-3" />}
            </div>
          ))}
        </ScrollArea>
      )}
    </div>
  );
}
