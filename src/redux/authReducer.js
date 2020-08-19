import {AuthAPI, UserAPI} from "../api/api";

const SET_AUTH_USER_DATA = "SET_AUTH_USER_DATA";
const SET_CURRENT_USER_PROFILE = "SET_CURRENT_USER_PROFILE";
const SET_CURRENT_PROFILE_IS_FETCHING = "SET_CURRENT_PROFILE_IS_FETCHING";

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    currentUserProfile: null,
    isFetching: true,
}

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

export const setAuthUserData = (id, login, email, isAuth) =>
    ({type: SET_AUTH_USER_DATA, payload: {id, login, email, isAuth}});
export const setCurrentUserProfile = (profile) =>
    ({type: SET_CURRENT_USER_PROFILE, profile});
export const setCurrentProfileIsFetching = (isFetching) =>
    ({type: SET_CURRENT_PROFILE_IS_FETCHING, isFetching});

export const auth = () => {
    return (dispatch) => {
        AuthAPI.authMe()
            .then(data => {
                if (data.resultCode === 0) {
                    let {id, login, email} = data.data;
                    dispatch(setAuthUserData(id, login, email, true));
                    dispatch(setCurrentProfileIsFetching(true));
                    UserAPI.getUserProfile(id)
                        .then(data => {
                            dispatch(setCurrentUserProfile(data));
                            dispatch(setCurrentProfileIsFetching(false));
                        })
                }
            });
    }
}

export const login = (email, password, rememberMe) => (dispatch) => {
    AuthAPI.login(email, password, rememberMe)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(auth());
            }
            else if (data.resultCode === 1) {
                console.log(data.messages);
            }
            else if (data.resultCode ===10){
                console.log("captcha");
            }
        });
};
export const logout = () => (dispatch) => {
    AuthAPI.logout()
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
                dispatch(setCurrentUserProfile(null));
            }
        })

};