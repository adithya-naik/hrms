import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/store";

export interface TimesheetEntry {
  id: string;
  userId: string;
  taskId: string;
  workedHrs: number;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  description?: string;
  workDate: string;
  startedOn?: string | null;
  completedOn?: string | null;
  createdAt: string;
  updatedAt: string;
  task: {
    id: string;
    name: string;
    priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    module: { id: string; name: string; project: { id: string; projectName: string } };
    assignedTo: { id: string; firstName: string; lastName: string };
  };
  user: { id: string; firstName: string; lastName: string };
}

export interface WeeklySummary {
  weekStart: string;
  weekEnd: string;
  totalHours: number;
  avgPerDay: number;
  weeklyTarget: number;
  avgPerDayTarget: number;
  progressPercent: number;
}

export const timesheetApi = createApi({
  reducerPath: "timesheetApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token || localStorage.getItem("auth_token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Timesheets"],
  endpoints: (builder) => ({
    // Employee
    getMyTimesheets: builder.query<TimesheetEntry[], { from?: string; to?: string } | void>({
      query: (params) => {
        const q = new URLSearchParams();
        if (params && params.from) q.set("from", params.from);
        if (params && params.to) q.set("to", params.to);
        const qs = q.toString();
        return `/timesheets/mine${qs ? `?${qs}` : ""}`;
      },
      providesTags: (res) =>
        res
          ? [
              ...res.map((r) => ({ type: "Timesheets" as const, id: r.id })),
              { type: "Timesheets" as const, id: "MINE" },
            ]
          : [{ type: "Timesheets", id: "MINE" }],
    }),
    getMyWeeklySummary: builder.query<WeeklySummary, void>({
      query: () => `/timesheets/mine/summary`,
      providesTags: [{ type: "Timesheets", id: "SUMMARY" }],
    }),
    createTimesheet: builder.mutation<TimesheetEntry, Partial<TimesheetEntry> & { taskId: string }>({
      query: (body) => ({
        url: `/timesheets`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Timesheets", id: "MINE" }, { type: "Timesheets", id: "SUMMARY" }],
    }),
    updateTimesheet: builder.mutation<TimesheetEntry, { id: string; data: Partial<TimesheetEntry> }>({
      query: ({ id, data }) => ({
        url: `/timesheets/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (res, err, arg) => [{ type: "Timesheets", id: arg.id }, { type: "Timesheets", id: "SUMMARY" }],
    }),
    deleteTimesheet: builder.mutation<{ message: string }, string>({
      query: (id) => ({ url: `/timesheets/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Timesheets", id: "MINE" }, { type: "Timesheets", id: "SUMMARY" }],
    }),

    // Manager/HR endpoints can be added similarly if you want views now
  }),
});

export const {
  useGetMyTimesheetsQuery,
  useGetMyWeeklySummaryQuery,
  useCreateTimesheetMutation,
  useUpdateTimesheetMutation,
  useDeleteTimesheetMutation,
} = timesheetApi;
