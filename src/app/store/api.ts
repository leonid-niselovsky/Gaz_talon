import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { QuotaVM, UserVM } from "../../utils/interfaces.ts";

export const Api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
    prepareHeaders: (headers) => {
      headers.set("Accept", "*/*");
      return headers;
    },
  }),
  tagTypes: ["quota"],
  endpoints: (builder) => ({
    getUsers: builder.query<UserVM[], void>({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
    }),
    getQuotas: builder.query<QuotaVM[], void>({
      query: () => ({
        url: `/quotas`,
        method: "GET",
      }),
      providesTags: ["quota"],
    }),
    createQuota: builder.mutation<void, QuotaVM>({
      query: (body) => ({
        url: `/quotas`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["quota"],
    }),
    updateQuota: builder.mutation<void, QuotaVM>({
      query: (body) => ({
        url: `/quotas/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["quota"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetQuotasQuery,
  useCreateQuotaMutation,
  useUpdateQuotaMutation,
} = Api;
