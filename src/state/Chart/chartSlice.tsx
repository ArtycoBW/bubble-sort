import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ChartState {
  items: number[];
  currentIndex: number;
  speed: number;
  isSorting: boolean;
}

const initialState: ChartState = {
  items: Array.from(Array(60).keys()),
  currentIndex: -1,
  speed: 10,
  isSorting: false,
};

export const shuffleItems = createAsyncThunk<void, void, { state: RootState }>(
  "items/shuffle",
  async (_, { dispatch, getState }) => {
    dispatch(setIsSorting(true));
    const array = Array.from(Array(getState().items.items.length).keys());
    array.sort(() => Math.random() - 0.5);

    dispatch(setItems(array));
    dispatch(setCurrentIndex(-1));
    dispatch(setIsSorting(false));
  }
);

export const sortItems = createAsyncThunk<void, void, { state: RootState }>(
  "items/sort",
  async (_, { dispatch, getState }) => {
    dispatch(setIsSorting(true));
    const array = [...getState().items.items];

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length; j++) {
        dispatch(setCurrentIndex(j));
        if (array[j] > array[j + 1]) {
          const tmp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = tmp;
          dispatch(setItems([...array]));
          await new Promise((resolve) =>
            setTimeout(resolve, getState().items.speed)
          );
        }
      }
    }
    dispatch(setIsSorting(false));
  }
);

export const chartSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<number[]>) => {
      state.items = action.payload;
    },
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
    setSpeed: (state, action: PayloadAction<number>) => {
      state.speed = action.payload;
    },
    setIsSorting: (state, action: PayloadAction<boolean>) => {
      state.isSorting = action.payload;
    },
  },
});

export const { setItems, setCurrentIndex, setSpeed, setIsSorting } =
  chartSlice.actions;
export default chartSlice.reducer;
