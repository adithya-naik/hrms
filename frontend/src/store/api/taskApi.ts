// redux/taskApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Project {
  id: string;
  projectName: string;
  // Add other project properties as needed
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
  assignedTo: { id: string; firstName: string; lastName: string };
}

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5000/api/',
    prepareHeaders: (headers, { getState }) => {
      // Debug: Check what's in localStorage
      console.log('All localStorage keys:', Object.keys(localStorage));
      console.log('localStorage contents:', {
        authToken: localStorage.getItem('authToken'),
        token: localStorage.getItem('token'),
        accessToken: localStorage.getItem('accessToken'),
        jwt: localStorage.getItem('jwt'),
        bearerToken: localStorage.getItem('bearerToken'),
      });
      
      // Try multiple possible token keys (including auth_token with underscore)
      const token = localStorage.getItem('auth_token') ||  // This is the one you have!
                   localStorage.getItem('authToken') || 
                   localStorage.getItem('token') ||
                   localStorage.getItem('accessToken') ||
                   localStorage.getItem('jwt') ||
                   localStorage.getItem('bearerToken');
      
      console.log('Found token:', token ? 'YES (length: ' + token.length + ')' : 'NO');
      
      // If token exists, add it to headers
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        console.log('Added Authorization header with Bearer token');
      } else {
        console.log('No token found - request will fail');
      }
      
      return headers;
    },
  }),
  tagTypes: ["Tasks", "Modules", "Projects"],
  endpoints: (builder) => ({
    // Projects endpoints (try without auth first)
    getProjects: builder.query<Project[], void>({
      query: () => "/projects",
      providesTags: ["Projects"],
    }),
    createProject: builder.mutation<Project, Partial<Project>>({
      query: (body) => ({
        url: "/projects",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Projects"],
    }),
    
    // Tasks endpoints
    getTasks: builder.query<Task[], void>({
      query: () => "/tasks",
      providesTags: ["Tasks"],
    }),
    createTask: builder.mutation<Task, Partial<Task>>({
      query: (body) => ({
        url: "/tasks",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),
    
    // Modules endpoints
    createModule: builder.mutation<Module, Partial<Module>>({
      query: (body) => ({
        url: "/modules",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Modules"],
    }),
    getModules: builder.query<Module[], void>({
      query: () => "/modules",
      providesTags: ["Modules"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useCreateModuleMutation,
  useGetModulesQuery,
  useGetProjectsQuery,
  useCreateProjectMutation,
} = taskApi;