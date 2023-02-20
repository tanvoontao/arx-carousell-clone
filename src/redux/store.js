'use client'
import { configureStore } from "@reduxjs/toolkit";
import alertSlice from './alert/reducer';
import modalSlide from './modal/reducer';
import { api } from "./user/reducer"

export function makeStore() {
    return configureStore({
        reducer: {
            alert: alertSlice,
            modal: modalSlide,
            [api.reducerPath]: api.reducer,
        },
        // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware),
        middleware: (gDM) => gDM().concat(api.middleware),
    });
}
// enables caching, invalidation, polling,

export const store = makeStore();


