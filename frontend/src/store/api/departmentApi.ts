// src/store/api/departmentApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const departmentApi = createApi({
  reducerPath: "departmentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  tagTypes: ["Department"], // 👈 enable caching/invalidation by tag
  endpoints: (builder) => ({
    // GET all departments
    getDepartments: builder.query<any, void>({
      query: () => "/departments",
      providesTags: ["Department"], // 👈 this data is tagged
    }),

    // GET single department
    getDepartment: builder.query<any, string>({
      query: (id) => `/departments/${id}`,
      providesTags: ["Department"],
    }),

    // CREATE
    createDepartment: builder.mutation<any, { name: string; description?: string; headId?: string }>({
      query: (body) => ({
        url: "/departments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Department"], // 👈 force refetch after create
    }),

    // UPDATE
    updateDepartment: builder.mutation<any, { id: string; body: any }>({
      query: ({ id, body }) => ({
        url: `/departments/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Department"], // 👈 force refetch after update
    }),

    // DELETE
    deleteDepartment: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/departments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Department"], // 👈 force refetch after delete
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useGetDepartmentQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentApi;
