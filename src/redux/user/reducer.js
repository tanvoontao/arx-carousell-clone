import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "getApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://jsonplaceholder.typicode.com/",
    }),
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => "posts",
        }),
    }),
})

export const { useGetUsersQuery } = api;