import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { adjustTokenKey } from "../consts";

export const adjustApi = createApi({
  reducerPath: "adjustApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.adjust.com/dashboard/api/",
    credentials: "include",
    prepareHeaders: headers => {
      // todo some kind of abstraction
      const token = localStorage.getItem(adjustTokenKey)
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
    })
  }),
})
