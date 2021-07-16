import { createStore, combineReducers, compose, applyMiddleware} from "redux";
import postsReducer from "./ducks/posts";
import authReducer from "./ducks/auth";
import errorReducer from "./ducks/error";
import loadingReducer from "./ducks/loading";

import thunk from 'redux-thunk'

const reducers = combineReducers({
    posts: postsReducer,
    auths: authReducer,
    error: errorReducer,
    loading: loadingReducer
})


const store = createStore(reducers, compose(applyMiddleware(thunk)))

export default store