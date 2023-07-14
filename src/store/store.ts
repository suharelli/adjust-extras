import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { adjustApi } from "../api/adjust.api";

const rootReducer = combineReducers({
  [adjustApi.reducerPath]: adjustApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      adjustApi.middleware
    )
})