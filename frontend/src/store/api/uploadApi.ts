import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../index';

export const uploadApi = createApi({
  reducerPath: 'uploadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/upload',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    uploadProfilePicture: builder.mutation<{
      success: boolean;
      message: string;
      data: {
        user: any;
        image: {
          url: string;
          publicId: string;
          filename: string;
        };
      };
    }, FormData>({
      query: (file) => ({
        url: '/profile-picture',
        method: 'POST',
        body: file,
      }),
    }),
  }),
});

export const { useUploadProfilePictureMutation } = uploadApi;
