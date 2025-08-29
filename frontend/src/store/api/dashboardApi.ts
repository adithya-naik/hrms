import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../index';

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/dashboard',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Dashboard'],
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => '/stats',
      providesTags: ['Dashboard'],
    }),
    getRecentLeaves: builder.query({
      query: (limit) => ({
        url: '/recent-leaves',
        params: { limit },
      }),
      providesTags: ['Dashboard'],
    }),
    getUpcomingLeaves: builder.query({
      query: (limit) => ({
        url: '/upcoming-leaves',
        params: { limit },
      }),
      providesTags: ['Dashboard'],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetRecentLeavesQuery,
  useGetUpcomingLeavesQuery,
} = dashboardApi;