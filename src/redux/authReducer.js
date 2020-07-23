const SET_AUTH_USER_DATA = "SET_AUTH_USER_DATA";
const SET_CURRENT_USER_PROFILE = "SET_CURRENT_USER_PROFILE";
const SET_CURRENT_PROFILE_IS_FETCHING= "SET_CURRENT_PROFILE_IS_FETCHING";

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    currentUserProfile:null,
    isFetching: true,
}

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true,
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

export const setAuthUserData = (id, login, email) =>
    ({type: SET_AUTH_USER_DATA, data: {id, login, email}});
export const setCurrentUserProfile = (profile) =>
    ({type: SET_CURRENT_USER_PROFILE, profile});
export const setCurrentProfileIsFetching = (isFetching) =>
    ({type: SET_CURRENT_PROFILE_IS_FETCHING, isFetching});
