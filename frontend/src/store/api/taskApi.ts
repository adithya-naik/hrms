// redux/taskApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Project {
  id: string;
  projectName: string;
}

export interface Module {
  id: string;
  name: string;
  projectId: string;
}

export interface Task {
  id: string;
  name: string;
  description?: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  allocatedHrs: number;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "BLOCKED";
  module: {
    id: string;
    name: string;
    project: { id: string; projectName: string };
  };
  assignedTo: { id: string; firstName: string; lastName: string; employeeId: string };
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  employeeId: string;
}

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('auth_token') || localStorage.getItem('authToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Tasks", "Modules", "Projects", "Users"],
  endpoints: (builder) => ({
    // Projects
    getProjects: builder.query<Project[], void>({
      query: () => "/projects",
      providesTags: ["Projects"],
    }),
    createProject: builder.mutation<Project, Partial<Project>>({
      query: (body) => ({ url: "/projects", method: "POST", body }),
      invalidatesTags: ["Projects"],
    }),

    // Modules
    getModules: builder.query<Module[], void>({
      query: () => "/modules",
      providesTags: ["Modules"],
    }),
    createModule: builder.mutation<Module, Partial<Module>>({
      query: (body) => ({ url: "/modules", method: "POST", body }),
      invalidatesTags: ["Modules"],
    }),

    // Tasks
    getTasks: builder.query<Task[], void>({
      query: () => "/tasks",
      providesTags: ["Tasks"],
    }),
    createTask: builder.mutation<Task, Partial<Task>>({
      query: (body) => ({ url: "/tasks", method: "POST", body }),
      invalidatesTags: ["Tasks"],
    }),

    // Users (for dropdown)
    getUsers: builder.query<User[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useGetModulesQuery,
  useCreateModuleMutation,
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetUsersQuery, // <-- Add this
} = taskApi;
