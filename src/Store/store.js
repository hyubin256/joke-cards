import idReducer from './Model/jokeSlice';
import titleReducer from './Model/titleJokeSlice';
import contentJokeReducer from './Model/contentJokeSlice';
const { configureStore } = require("@reduxjs/toolkit");

const rootReducer ={
    ids: idReducer,
    titleJokes: titleReducer,
    contentJokes: contentJokeReducer,
}

const store = configureStore({
    reducer: rootReducer,
})

export default store;