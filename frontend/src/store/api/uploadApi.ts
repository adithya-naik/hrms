import { baseApi } from './baseApi';

export const uploadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadProfilePicture: builder.mutation<
      { url: string; publicId: string; filename: string; user: any },
      FormData
    >({
      query: (formData) => ({
        url: '/upload/profile-picture',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['User'],
    }),
    deleteProfilePicture: builder.mutation<
      { message: string; user: any },
      void
    >({
      query: () => ({
        url: '/upload/profile-picture',
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    uploadDocument: builder.mutation<
      { url: string; publicId: string; filename: string },
      FormData
    >({
      query: (formData) => ({
        url: '/upload/document',
        method: 'POST',
        body: formData,
      }),
    }),
    deleteDocument: builder.mutation<
      { message: string },
      string
    >({
      query: (publicId) => ({
        url: `/upload/document/${publicId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useUploadProfilePictureMutation,
  useDeleteProfilePictureMutation,
  useUploadDocumentMutation,
  useDeleteDocumentMutation,
} = uploadApi;
