import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dummyApi = createApi({
    reducerPath: "dummyApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/"}),
    endpoints: () => ({}),
})