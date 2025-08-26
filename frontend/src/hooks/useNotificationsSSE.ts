import { useEffect } from "react";
import { notificationApi } from "@/store/api/notificationApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

export function useNotificationsSSE() {
    const dispatch = useDispatch();
    const { token, isAuthenticated } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        // Only establish SSE connection if user is authenticated and has token
        if (!isAuthenticated || !token) {
            return;
        }

        console.log("🔗 Establishing SSE connection...");
        
        // Include token as query parameter since EventSource doesn't support custom headers
        const url = `http://localhost:5000/api/notifications/stream?token=${encodeURIComponent(token)}`;
        const es = new EventSource(url, { withCredentials: true });

        const handleMessage = (e: MessageEvent) => {
            try {
                const data = JSON.parse(e.data);
                console.log("🔔 SSE event:", data);

                // Only invalidate for actual notification events, not heartbeat/connected
                if (data.type !== "heartbeat" && data.type !== "connected") {
                    dispatch(
                        notificationApi.util.invalidateTags([
                            { type: "Notification", id: "LIST" },
                        ])
                    );
                }
            } catch (err) {
                console.error("❌ SSE parse error", err);
            }
        };

        const handleError = (error: Event) => {
            console.error("❌ SSE connection error:", error);
            // Don't automatically reconnect to prevent loops
        };

        const handleOpen = () => {
            console.log("✅ SSE connection established");
        };

        es.addEventListener("message", handleMessage);
        es.addEventListener("new", handleMessage);
        es.addEventListener("update", handleMessage);
        es.addEventListener("readAll", handleMessage);
        es.addEventListener("error", handleError);
        es.addEventListener("open", handleOpen);

        return () => {
            console.log("🔌 Closing SSE connection");
            es.close();
        };
    }, [dispatch, token, isAuthenticated]);
}
