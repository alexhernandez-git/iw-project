import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import user from "./user";
import expedients from "./expedients";
import expedient from "./expedient";
import expedientTypes from "./expedient-types";
import expedientType from "./expedient-type";

export const store = configureStore({
  reducer: {
    user,
    expedients,
    expedient,
    expedientTypes,
    expedientType,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
