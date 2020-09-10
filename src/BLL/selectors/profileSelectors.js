import {createSelector} from "reselect";

const getPostsSelector = (state) => {
    return state.profilePage.posts;
}

export const getPosts = createSelector(getPostsSelector,
    (posts) => {
        let postsArray = [...posts];
        return postsArray.reverse();
    }
)
export const getProfile = (state) => {
    return state.profilePage.profile;
}
export const getProfileIsFetching = (state) => {
    return state.profilePage.profileIsFetching;
}
export const getProfileStatus = (state) => {
    return state.profilePage.status;
}
export const getProfilePageErros = (state) => {
    return state.profilePage.pageErrors;
}

