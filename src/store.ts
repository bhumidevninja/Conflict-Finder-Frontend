import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import IncDecReducer from './reducers/components'

const store = configureStore({
  reducer: {
    IncDec: IncDecReducer, 
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector 

export default store