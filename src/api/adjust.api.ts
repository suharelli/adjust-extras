import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";

export const adjustApi = createApi({
  reducerPath: "adjustApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.adjust.com/dashboard/api/",
    prepareHeaders: (headers, api) => {
      const token = (api.getState() as RootState).auth.adjustToken
      if (token) {
        headers.set("Authorization", `Token token=${token}`)
      }

      return headers
    },
  }),
  endpoints: builder => ({
    blackList: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `trackers/${id}/blacklist`,
        method: "POST"
      })
    }),
    unblacklist: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `trackers/${id}/unblacklist`,
        method: "POST",
      })
    }),
  }),
})
