import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import messagesReducer from "./messagesReducer";
import profileReducer from "./profileReducer";
import appReducer from "./appReducer";
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
        app: appReducer,
        form: formReducer,
    }
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)));

/*let store = createStore(reducers, applyMiddleware(thunkMiddleWare));*/

export default store;

window._store = store;