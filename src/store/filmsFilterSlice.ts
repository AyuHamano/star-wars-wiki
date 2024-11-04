// src/store/filterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilmsFilterState {
  director: string;
  producer: string;
}

const initialState: FilmsFilterState = {
  director: "",
  producer: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setDirector: (state, action: PayloadAction<string>) => {
      state.director = action.payload;
    },
    setProducer: (state, action: PayloadAction<string>) => {
      state.producer = action.payload;
    },
  },
});

export const { setDirector, setProducer } = filterSlice.actions;

export default filterSlice.reducer;
