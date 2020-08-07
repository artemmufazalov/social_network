import {applyMiddleware, combineReducers, createStore} from "redux";
import {messagesReducer} from "./messagesReducer";
import {profileReducer} from "./profileReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleWare from "redux-thunk";
import {reducer as formReducer} from "redux-form";

let reducers = combineReducers(
    {
        messagesPage: messagesReducer,
        profilePage: profileReducer,
        usersPage: usersReducer,
        auth: authReducer,
        form: formReducer,
    }
);


let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

export default store;

window.store = store;