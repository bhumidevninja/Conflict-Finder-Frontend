import { createSlice } from "@reduxjs/toolkit";

interface IncDecInitialStateType {
  currentNumber: number;
}

const initialState: IncDecInitialStateType = {
  currentNumber: 0,
};

const IncDecSlice = createSlice({
  name: "incDecSlice",
  initialState,
  reducers: {
    incrementNumber: (state) => {
      state.currentNumber += 1;
    },
    decrementNumber: (state) => {
      state.currentNumber -= 1;
    },
    incrementUserValue: (state, action) => {
      state.currentNumber += action.payload;
    },
    decrementUserValue: (state, action) => {
      state.currentNumber -= action.payload;
    },
  },
});

export const IncDecServices = {
  actions: IncDecSlice.actions,
};

const IncDecReducer = IncDecSlice.reducer;
export default IncDecReducer;
