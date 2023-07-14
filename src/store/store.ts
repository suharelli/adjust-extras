import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { adjustApi } from "../api/adjust.api";
import { authSlice } from "../reducers/auth.slice";

const rootReducer = combineReducers({
  [adjustApi.reducerPath]: adjustApi.reducer,
  [authSlice.name]: authSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      adjustApi.middleware
    )
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
