import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleWare from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import {composeWithDevTools} from "redux-devtools-extension";

import messagesPageReducer from "../reducers/messagesPageReducer";
import profileReducer from "../reducers/profileReducer";
import appReducer from "../reducers/appReducer";
import usersReducer from "../reducers/usersReducer";
import authReducer from "../reducers/authReducer";


let reducers = combineReducers(
    {
        messagesPage: messagesPageReducer,
        profilePage: profileReducer,
        usersPage: usersReducer,
        auth: authReducer,
        app: appReducer,
        form: formReducer,
    }
);

const composeEnhancers = composeWithDevTools({
        actionsBlacklist: ["@@redux-form/"]
});

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)));

export default store;

window._store = store;