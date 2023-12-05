import { configureStore } from "@reduxjs/toolkit";
import chartReducer from "./Chart/chartSlice";

export const store = configureStore({
  reducer: {
    items: chartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
