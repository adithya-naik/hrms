import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../index';

export const leaveApi = createApi({
  reducerPath: 'leaveApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/leaves',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Leave', 'LeaveBalance', 'TeamLeave'],
  endpoints: (builder) => ({
    getLeaves: builder.query({
      query: (params) => ({
        url: '',
        params,
      }),
      providesTags: ['Leave'],
    }),
    createLeave: builder.mutation({
      query: (leaveData) => ({
        url: '',
        method: 'POST',
        body: leaveData,
      }),
      invalidatesTags: ['Leave', 'LeaveBalance'],
    }),
    getLeaveBalances: builder.query({
      query: (year) => ({
        url: '/balances',
        params: { year },
      }),
      providesTags: ['LeaveBalance'],
    }),
    approveLeave: builder.mutation({
      query: (id) => ({
        url: `/${id}/approve`,
        method: 'PUT',
      }),
      invalidatesTags: ['Leave', 'TeamLeave', 'LeaveBalance'],
    }),
    rejectLeave: builder.mutation({
      query: ({ id, rejectionReason }) => ({
        url: `/${id}/reject`,
        method: 'PUT',
        body: { rejectionReason },
      }),
      invalidatesTags: ['Leave', 'TeamLeave', 'LeaveBalance'],
    }),
    cancelLeave: builder.mutation({
      query: (id) => ({
        url: `/${id}/cancel`,
        method: 'PUT',
      }),
      invalidatesTags: ['Leave', 'LeaveBalance'],
    }),
    getTeamLeaves: builder.query({
      query: (params) => ({
        url: '/team',
        params,
      }),
      providesTags: ['TeamLeave'],
    }),
    getLeavePolicies: builder.query({
      query: () => '/policies',
    }),
  }),
});

export const {
  useGetLeavesQuery,
  useCreateLeaveMutation,
  useGetLeaveBalancesQuery,
  useApproveLeaveMutation,
  useRejectLeaveMutation,
  useCancelLeaveMutation,
  useGetTeamLeavesQuery,
  useGetLeavePoliciesQuery,
} = leaveApi;