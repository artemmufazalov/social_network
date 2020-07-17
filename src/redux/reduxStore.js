import {combineReducers, createStore} from "redux";
import {messagesReducer} from "./messagesReducer";
import {postsReducer} from "./postsReducer";

let reducers = combineReducers(
    {
        messagesPage: messagesReducer,
        postsData: postsReducer,
    }
);


let store = createStore(reducers);

export default store;

window.store = store;