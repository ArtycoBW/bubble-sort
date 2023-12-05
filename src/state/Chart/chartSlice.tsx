import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: Array.from(Array(60).keys()),
  currentIndex: -1,
};

export const chartSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
  },
});

export const { setItems, setCurrentIndex } = chartSlice.actions;
export default chartSlice.reducer;
