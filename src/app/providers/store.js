import { configureStore } from "@reduxjs/toolkit";
import { dummyApi } from "../../shared/api/dummyAPi";
import uiReducer from '../../shared/model/uiSlice'

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        [dummyApi.reducerPath]: dummyApi.reducer,
    },

    middleware: (middlewareDefault) => (
        middlewareDefault().concat(dummyApi.middleware)
    )
})