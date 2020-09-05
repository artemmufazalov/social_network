import {AuthAPI, SecurityAPI, UserAPI} from "../api/api";
import {stopSubmit} from "redux-form";

//Action types
const SET_AUTH_USER_DATA = "authReducer/SET_AUTH_USER_DATA";
const SET_CURRENT_USER_PROFILE = "authReducer/SET_CURRENT_USER_PROFILE";
const SET_CURRENT_PROFILE_IS_FETCHING = "authReducer/SET_CURRENT_PROFILE_IS_FETCHING";
const SET_CURRENT_USER_PROFILE_PHOTO = "authReducer/SET_CURRENT_USER_PROFILE_PHOTO"
const SET_CAPTCHA_URL = "authReducer/SET_CAPTCHA_URL";

//Initial state
let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    currentUserProfile: null,
    isFetching: true,
    captchaURL: null,
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
        case SET_CURRENT_USER_PROFILE_PHOTO:
            return {
                ...state,
                currentUserProfile: {
                    ...state.currentUserProfile,
                    photos: {...action.photos}
                }
            }
        case SET_CAPTCHA_URL:
            return {
                ...state,
                captchaURL: action.captchaURL
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
export const setCurrentUserProfilePhotos = (photos) =>
    ({type: SET_CURRENT_USER_PROFILE_PHOTO, photos});
export const setCaptchaURL = (captchaURL) =>
    ({type: SET_CAPTCHA_URL, captchaURL});


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

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let data = await AuthAPI.login(email, password, rememberMe, captcha);
    if (data.resultCode === 0) {
        dispatch(auth());
        dispatch(setCaptchaURL(null));
    } else {
        if (data.resultCode === 10) {
            dispatch(getCaptcha());
            dispatch(stopSubmit("login", {_error: "You need to submit captcha",}));
        }
        else {
            let message = data.messages.length > 0 ? data.messages[0] : "Some error";
            dispatch(stopSubmit("login", {_error: message,}));
        }
    }
};

export const logout = () => async (dispatch) => {
    let data = await AuthAPI.logout();
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
        dispatch(setCurrentUserProfile(null));
    }
};

export const getCaptcha = () => async (dispatch) => {
    let data = await SecurityAPI.getCaptcha();
    dispatch(setCaptchaURL(data.url));
}