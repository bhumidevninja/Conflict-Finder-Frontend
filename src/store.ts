import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import authSlice from "./reducers/authSlice";
import projectSlice from "./reducers/projectSlice";



const store = configureStore({
  reducer: {
    auth: authSlice,
    project: projectSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector 

export default store;