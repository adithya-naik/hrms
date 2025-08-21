import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../index';

// Types
export interface LeavePolicy {
  id: string;
  leaveType: "SICK" | "CASUAL" | "VACATION" | "ACADEMIC" | "COMP_OFF" | "WFH";
  annualQuota: number;
  maxConsecutiveDays?: number | null;
  minDaysNotice: number;
  requiresApproval: boolean;
  requiresDocument: boolean;
  carryForwardAllowed: boolean;
  maxCarryForward?: number | null;
  isActive: boolean;
}

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
  tagTypes: ['Leave', 'LeaveBalance', 'TeamLeave', 'LeavePolicy'],
  endpoints: (builder) => ({
    // ---- Leave Endpoints ----
    getLeaves: builder.query<any, any>({
      query: (params) => ({
        url: '',
        params,
      }),
      providesTags: ['Leave'],
    }),
    createLeave: builder.mutation<any, any>({
      query: (leaveData) => ({
        url: '',
        method: 'POST',
        body: leaveData,
      }),
      invalidatesTags: ['Leave', 'LeaveBalance'],
    }),
    getLeaveBalances: builder.query<any, number>({
      query: (year) => ({
        url: '/balances',
        params: { year },
      }),
      providesTags: ['LeaveBalance'],
    }),
    approveLeave: builder.mutation<any, string>({
      query: (id) => ({
        url: `/${id}/approve`,
        method: 'PUT',
      }),
      invalidatesTags: ['Leave', 'TeamLeave', 'LeaveBalance'],
    }),
    rejectLeave: builder.mutation<any, { id: string; rejectionReason: string }>({
      query: ({ id, rejectionReason }) => ({
        url: `/${id}/reject`,
        method: 'PUT',
        body: { rejectionReason },
      }),
      invalidatesTags: ['Leave', 'TeamLeave', 'LeaveBalance'],
    }),
    cancelLeave: builder.mutation<any, string>({
      query: (id) => ({
        url: `/${id}/cancel`,
        method: 'PUT',
      }),
      invalidatesTags: ['Leave', 'LeaveBalance'],
    }),
    getTeamLeaves: builder.query<any, any>({
      query: (params) => ({
        url: '/team',
        params,
      }),
      providesTags: ['TeamLeave'],
    }),

    // ---- Leave Policy Endpoints ----
    getLeavePolicies: builder.query<{ policies: LeavePolicy[] }, void>({
      query: () => '/policies',
      providesTags: ['LeavePolicy'],
    }),
    createLeavePolicy: builder.mutation<{ policy: LeavePolicy }, Partial<LeavePolicy>>({
      query: (body) => ({
        url: '/policies',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['LeavePolicy'],
    }),
    updateLeavePolicy: builder.mutation<{ policy: LeavePolicy }, { id: string; body: Partial<LeavePolicy> }>({
      query: ({ id, body }) => ({
        url: `/policies/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['LeavePolicy'],
    }),
deleteLeavePolicy: builder.mutation<{ success: boolean }, { id: string }>({
  query: ({ id }) => ({
    url: `/policies/${id}`,
    method: "DELETE",
  }),
  invalidatesTags: (result, error, { id }) => [
    { type: "LeavePolicy", id },
    { type: "LeavePolicy", id: "LIST" },
  ],
}),

  }),
});

export const {
  // Leave
  useGetLeavesQuery,
  useCreateLeaveMutation,
  useGetLeaveBalancesQuery,
  useApproveLeaveMutation,
  useRejectLeaveMutation,
  useCancelLeaveMutation,
  useGetTeamLeavesQuery,

  // Policies
  useGetLeavePoliciesQuery,
  useCreateLeavePolicyMutation,
  useUpdateLeavePolicyMutation,
  useDeleteLeavePolicyMutation,
} = leaveApi;
