import { createSlice } from "@reduxjs/toolkit";

const watchLaterSlice = createSlice({
  name: "watchLater",
  initialState: {
    list: []
  },
  reducers: {
    addToWatchLater: (state, action) => {
      const exists = state.list.find(v => v.id === action.payload.id);
      if (!exists) {
        state.list.push(action.payload);
      } else {
        alert("This video is already saved!");
      }
    },
    removeFromWatchLater: (state, action) => {
      state.list = state.list.filter(v => v.id !== action.payload.id);
    }
  }
});

export const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions;
export default watchLaterSlice.reducer;
