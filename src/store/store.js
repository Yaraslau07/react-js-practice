import { configureStore } from "@reduxjs/toolkit";
import { dummyApi } from "../api/dummyAPi";
import uiReducer from './uiSlice'

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        [dummyApi.reducerPath]: dummyApi.reducer,
    },

    middleware: (middlewareDefault) => (
        middlewareDefault().concat(dummyApi.middleware)
    )
})