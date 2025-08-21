import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../index';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/auth',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    login: builder.mutation<
      any,
      { username: string; password: string }
    >({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    register: builder.mutation<
      any,
      {
        username: string;
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        employeeId: string;
        role: 'EMPLOYEE' | 'MANAGER' | 'HR' | 'ADMIN';
        departmentId?: string;
        managerId?: string;
        joinDate?: string; // ISO (yyyy-mm-dd)
      }
    >({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
    }),

    refreshToken: builder.mutation<any, string>({
      query: (refreshToken) => ({
        url: '/refresh-token',
        method: 'POST',
        body: { refreshToken },
      }),
    }),

    getProfile: builder.query<any, void>({
      query: () => '/me',
      providesTags: ['User'],
    }),

    updateProfile: builder.mutation<any, Partial<{
      firstName: string;
      lastName: string;
      email: string;
      profileImage?: string;
    }>>({
      query: (userData) => ({
        url: '/profile',
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),

    changePassword: builder.mutation<any, { currentPassword: string; newPassword: string }>({
      query: (passwordData) => ({
        url: '/change-password',
        method: 'PUT',
        body: passwordData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = authApi;
