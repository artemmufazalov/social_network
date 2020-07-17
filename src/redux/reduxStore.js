import {combineReducers, createStore} from "redux";
import {messagesReducer} from "./messagesReducer";
import {postsReducer} from "./postsReducer";
import usersReducer from "./usersReducer";

let reducers = combineReducers(
    {
        messagesPage: messagesReducer,
        postsData: postsReducer,
        usersPage: usersReducer,
    }
);


let store = createStore(reducers);

export default store;

window.store = store;