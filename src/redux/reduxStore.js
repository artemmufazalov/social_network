import {applyMiddleware, combineReducers, createStore} from "redux";
import {messagesReducer} from "./messagesReducer";
import {profileReducer} from "./profileReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleWare from "redux-thunk";

let reducers = combineReducers(
    {
        messagesPage: messagesReducer,
        profilePage: profileReducer,
        usersPage: usersReducer,
        auth: authReducer,
    }
);


let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

export default store;

window.store = store;