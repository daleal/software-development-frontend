import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_HOST } from "@/constants/api";

export const toolListingApi = createApi({
  reducerPath: "toolListingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_API_HOST}/api/tool-listings`,
  }),
  endpoints: (builder) => ({
    getToolListings: builder.query({
      query: () => "",
    }),
    getToolListingById: builder.query({
      query: (id) => `/${id}`,
    }),
    postToolListing: builder.mutation({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetToolListingsQuery,
  useGetToolListingByIdQuery,
  usePostToolListingMutation,
} = toolListingApi;
