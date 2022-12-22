import { createSlice } from "@reduxjs/toolkit";

const eachJoke = createSlice({
  name: "joke",
  initialState: {
    id: "",
  },
  reducers: {
    addId: (state, action) => {      
      state = { id: action.payload };
      return state
    },
  },
});

const { reducer, actions } = eachJoke;
export const { addId } = actions;
export default reducer;
