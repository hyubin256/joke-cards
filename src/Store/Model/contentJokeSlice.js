import { createSlice} from "@reduxjs/toolkit";


const contentJoke = createSlice({
  name: "contentJoke",
  initialState: {
    uncategories: [],
    animal: [],
    career: [],
    celebrity: [],
    dev: [],
    explicit: [],
    family: [],
    fashion: [],
    food: [],
    history: [],
    money: [],
    movie: [],
    music: [],
    political: [],
    religion: [],
    science: [],
    sport: [],
    travel: [],
    all:[]
  },
  reducers: {
    addAllContent: (state, action) => {              
      state = {...action.payload};  
      return state;         
    }
  },
});

const { reducer, actions } = contentJoke;
export const { addAllContent } = actions;
export default reducer;
