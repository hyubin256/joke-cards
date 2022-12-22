import { createSlice } from "@reduxjs/toolkit";


const titleJoke = createSlice({
  name: "titleJoke",
  initialState: {
    allTitle:[],
    halfTitle: []
  },
  reducers: {
    addAllTitle: (state, action) => { 
      // const arr = state;
      // const concatArr = arr.allTitle.concat(action.payload);      
      state.allTitle = [...action.payload];           
    },
    addHalfTitle: (state, action) =>{         
      // const concatArr = state.halfTitle.concat(action.payload);
      state.halfTitle = [...action.payload];           
    }
  },
});

const { reducer, actions } = titleJoke;
export const { addAllTitle, addHalfTitle } = actions;
export default reducer;
