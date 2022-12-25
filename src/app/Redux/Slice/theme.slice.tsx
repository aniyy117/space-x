import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkTheme: true,
};

const { actions, reducer } = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkTheme = !state.darkTheme;
    },
  },
});

export const { toggleTheme } = actions;

export { reducer as ThemeReducer, initialState as ThemeReducerInit };
