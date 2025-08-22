// src/redux/api/leaveApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../index";

// ---------------- Types ----------------
export interface Leave {
  id: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  status: string;
  requester?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface GetLeavesResponse {
  leaves: Leave[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface LeavePolicy {
  id: string;
  leaveType:
    | "SICK"
    | "CASUAL"
    | "VACATION"
    | "ACADEMIC"
    | "COMP_OFF"
    | "WFH";
  annualQuota: number;
  maxConsecutiveDays?: number | null;
  minDaysNotice: number;
  requiresApproval: boolean;
  requiresDocument: boolean;
  carryForwardAllowed: boolean;
  maxCarryForward?: number | null;
  isActive: boolean;
}

// ---------------- API ----------------
export const leaveApi = createApi({
  reducerPath: "leaveApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/leaves",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Leave", "LeaveBalance", "TeamLeave", "LeavePolicy"],
  endpoints: (builder) => ({
    // ---- Leave Endpoints ----
    getLeaves: builder.query<
      GetLeavesResponse,
      { status?: string; page?: number; limit?: number }
    >({
      query: ({ status, page = 1, limit = 10 }) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        params.append("page", String(page));
        params.append("limit", String(limit));
        return { url: "", params };
      },
      providesTags: ["Leave"],
    }),

    createLeave: builder.mutation<any, any>({
      query: (leaveData) => ({
        url: "",
        method: "POST",
        body: leaveData,
      }),
      invalidatesTags: ["Leave", "LeaveBalance"],
    }),

    getLeaveBalances: builder.query<any, number>({
      query: (year) => ({
        url: "/balances",
        params: { year },
      }),
      providesTags: ["LeaveBalance"],
    }),

    approveLeave: builder.mutation<any, string>({
      query: (id) => ({
        url: `/${id}/approve`,
        method: "PUT",
      }),
      invalidatesTags: ["Leave", "TeamLeave", "LeaveBalance"],
    }),

    rejectLeave: builder.mutation<
      any,
      { id: string; rejectionReason: string }
    >({
      query: ({ id, rejectionReason }) => ({
        url: `/${id}/reject`,
        method: "PUT",
        body: { rejectionReason },
      }),
      invalidatesTags: ["Leave", "TeamLeave", "LeaveBalance"],
    }),

    cancelLeave: builder.mutation<any, string>({
      query: (id) => ({
        url: `/${id}/cancel`,
        method: "PUT",
      }),
      invalidatesTags: ["Leave", "LeaveBalance"],
    }),

    getTeamLeaves: builder.query<any, any>({
      query: (params) => ({
        url: "/team",
        params,
      }),
      providesTags: ["TeamLeave"],
    }),

    // ---- Leave Policy Endpoints ----
    getLeavePolicies: builder.query<{ policies: LeavePolicy[] }, void>({
      query: () => "/policies",
      providesTags: (result) =>
        result?.policies
          ? [
              ...result.policies.map((p) => ({
                type: "LeavePolicy" as const,
                id: p.id,
              })),
              { type: "LeavePolicy", id: "LIST" },
            ]
          : [{ type: "LeavePolicy", id: "LIST" }],
    }),

    createLeavePolicy: builder.mutation<
      { policy: LeavePolicy },
      Partial<LeavePolicy>
    >({
      query: (body) => ({
        url: "/policies",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "LeavePolicy", id: "LIST" }],
    }),

    updateLeavePolicy: builder.mutation<
      { policy: LeavePolicy },
      { id: string; body: Partial<LeavePolicy> }
    >({
      query: ({ id, body }) => ({
        url: `/policies/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "LeavePolicy", id },
        { type: "LeavePolicy", id: "LIST" },
      ],
    }),

    deleteLeavePolicy: builder.mutation<{ success: boolean }, { id: string }>({
      query: ({ id }) => ({
        url: `/policies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "LeavePolicy", id: "LIST" }],
    }),
  }),
});

// ---------------- Hooks ----------------
export const {
  // Leaves
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
