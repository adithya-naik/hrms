import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Project, User } from '@/types';
import { RootState } from '@/store';

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Projects', 'Users'],
  endpoints: (builder) => ({
    // Fetch all projects
    getProjects: builder.query<Project[], void>({
      query: () => '/projects',
      providesTags: ['Projects'],
    }),

    // Create new project
    createProject: builder.mutation<Project, Partial<Project>>({
      query: (body) => ({
        url: '/projects',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Projects'],
    }),

    // Fetch managers for dropdown
    getManagers: builder.query<User[], void>({
      query: (_arg, _queryApi, _extraOptions) => {
        // Check if user is admin from the Redux state
        // Note: extraOptions not used, so we handle admin on backend instead
        return '/projects/managers';
      },
      providesTags: ['Users'],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetManagersQuery,
} = projectApi;
