import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import { leaveApi } from './api/leaveApi';
import { userApi } from './api/userApi';
import { dashboardApi } from './api/dashboardApi';
import { reportApi } from './api/reportApi';
import { departmentApi } from './api/departmentApi';
import { notificationApi } from "./api/notificationApi";
import { uploadApi } from "./api/uploadApi";
import authReducer from './slices/authSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [leaveApi.reducerPath]: leaveApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
      },
    }).concat(
      authApi.middleware,
      leaveApi.middleware,
      userApi.middleware,
      dashboardApi.middleware,
      reportApi.middleware,
      departmentApi.middleware,
      notificationApi.middleware,
      uploadApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
