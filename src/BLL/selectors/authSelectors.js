export const getAuthUserId = (state) => {
    return state.auth.id;
}
export const getAuthUserLogin = (state) => {
    return state.auth.login;
}
export const getAuthUserEmail = (state) => {
    return state.auth.email;
}
export const getIsUserAuth = (state) => {
    return state.auth.isAuth;
}
export const getCurrentUserProfile= (state) => {
    return state.auth.currentUserProfile;
}
export const getIsCurrentUserProfileFetching = (state) => {
    return state.auth.isFetching;
}
export const getCaptchaURL = (state) => {
    return state.auth.captchaURL;
}
