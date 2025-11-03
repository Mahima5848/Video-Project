import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "../slicers/slicer";

export default configureStore({
  reducer: {
    watchLater: videoReducer
  },
  devTools: true 
});
