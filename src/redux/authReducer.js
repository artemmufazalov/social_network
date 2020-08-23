import {AuthAPI, UserAPI} from "../api/api";
import {stopSubmit} from "redux-form";

//Action types
const SET_AUTH_USER_DATA = "authReducer/SET_AUTH_USER_DATA";
const SET_CURRENT_USER_PROFILE = "authReducer/SET_CURRENT_USER_PROFILE";
const SET_CURRENT_PROFILE_IS_FETCHING = "authReducer/SET_CURRENT_PROFILE_IS_FETCHING";

//Initial state
let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    currentUserProfile: null,
    isFetching: true,
}

//Reducer
const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                ...action.payload,
            };
        case SET_CURRENT_USER_PROFILE:
            return {
                ...state,
                currentUserProfile: action.profile,
            }
        case SET_CURRENT_PROFILE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            }
        default:
            return state;
    }
}

export default authReducer;

//Action Creators
export const setAuthUserData = (id, login, email, isAuth) =>
    ({type: SET_AUTH_USER_DATA, payload: {id, login, email, isAuth}});
export const setCurrentUserProfile = (profile) =>
    ({type: SET_CURRENT_USER_PROFILE, profile});
export const setCurrentProfileIsFetching = (isFetching) =>
    ({type: SET_CURRENT_PROFILE_IS_FETCHING, isFetching});

//Thunk creators
export const auth = () => async (dispatch) => {
    let authData = await AuthAPI.authMe();
    if (authData.resultCode === 0) {
        let {id, login, email} = authData.data;
        dispatch(setAuthUserData(id, login, email, true));
        dispatch(setCurrentProfileIsFetching(true));
        let userProfileData = await UserAPI.getUserProfile(id);
        dispatch(setCurrentUserProfile(userProfileData));
        dispatch(setCurrentProfileIsFetching(false));
    }
};

export const login = (email, password, rememberMe) => async (dispatch) => {
    let data = await AuthAPI.login(email, password, rememberMe);
    if (data.resultCode === 0) {
        dispatch(auth());
    } else {
        let message = data.messages.length > 0 ? data.messages[0] : "Some error";
        dispatch(stopSubmit("login", {_error: message,}));
    }
};

export const logout = () => async (dispatch) => {
    let data = await AuthAPI.logout();
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
        dispatch(setCurrentUserProfile(null));
    }
};