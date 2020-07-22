import {combineReducers, createStore} from "redux";
import {messagesReducer} from "./messagesReducer";
import {profileReducer} from "./profileReducer";
import usersReducer from "./usersReducer";

let reducers = combineReducers(
    {
        messagesPage: messagesReducer,
        profilePage: profileReducer,
        usersPage: usersReducer,
    }
);


let store = createStore(reducers);

export default store;

window.store = store;