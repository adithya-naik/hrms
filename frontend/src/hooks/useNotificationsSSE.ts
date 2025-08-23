import { useEffect } from "react";
import { notificationApi } from "@/store/api/notificationApi";
import { useDispatch } from "react-redux";

export function useNotificationsSSE() {
    const dispatch = useDispatch();

    useEffect(() => {
        const es = new EventSource("http://localhost:5000/api/notifications/stream", { withCredentials: true });


        const handleMessage = (e: MessageEvent) => {
            try {
                const data = JSON.parse(e.data);
                console.log("🔔 SSE event:", data);

                // Force RTK Query to refresh notifications + unread count
                dispatch(
                    notificationApi.util.invalidateTags([
                        { type: "Notification", id: "LIST" },
                    ])
                );
            } catch (err) {
                console.error("❌ SSE parse error", err);
            }
        };

        es.addEventListener("new", handleMessage);
        es.addEventListener("update", handleMessage);
        es.addEventListener("readAll", handleMessage);

        return () => {
            es.close();
        };
    }, [dispatch]);
}
