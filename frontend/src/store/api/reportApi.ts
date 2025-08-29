import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../index';

export const reportApi = createApi({
  reducerPath: 'reportApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/reports',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Report'],
  endpoints: (builder) => ({
    getLeaveSummary: builder.query({
      query: ({ startDate, endDate, departmentId }) => ({
        url: '/leave-summary',
        params: { startDate, endDate, departmentId },
      }),
      providesTags: ['Report'],
    }),
    getEmployeeBalances: builder.query({
      query: ({ year }) => ({
        url: '/employee-balances',
        params: { year },
      }),
      providesTags: ['Report'],
    }),
    getDepartmentAnalysis: builder.query({
      query: ({ startDate, endDate }) => ({
        url: '/department-analysis',
        params: { startDate, endDate },
      }),
      providesTags: ['Report'],
    }),
  }),
});


export const {
  useGetLeaveSummaryQuery,
  useGetEmployeeBalancesQuery,
  useGetDepartmentAnalysisQuery,
} = reportApi;
