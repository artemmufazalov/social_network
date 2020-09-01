import {getDate} from "../utils/functions/timeFunctions";
import {ProfileAPI, UserAPI} from "../api/api";
import {setCurrentUserProfile, setCurrentUserProfilePhotos} from "./authReducer";
import {stopSubmit} from "redux-form";

//Action types
const ADD_POST = "profileReducer/ADD_POST";
const SET_USER_PROFILE = "profileReducer/SET_USER_PROFILE";
const TOGGLE_IS_FETCHING = "profileReducer/TOGGLE_IS_FETCHING";
const SET_STATUS = "profileReducer/SET_STATUS";
const DELETE_POST = "profileReducer/DELETE_POST";
const SET_PROFILE_PHOTO = "profileReducer/SET_PROFILE_PHOTO";
const UPDATE_USER_PROFILE_DATA = "profileReducer/UPDATE_USER_PROFILE_DATA"

//Initial state
let initialState = {
    posts: [
        {
            id: 103,
            text: "Hello World, I'm the first post",
            time: "03.07.2020",
            likesCount: 8,
        },
        {
            id: 102,
            text: "some text",
            time: "01.07.2020",
            likesCount: 3,
        },
        {
            id: 101,
            text: "some text",
            time: "29.06.2020",
            likesCount: 0,
        }],
    profile: null,
    profileIsFetching: true,
    status: "",
};

//Reducer
const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            let initialLikesCount = 0;
            let currentMaxID = state.posts[0].id;
            let postId = currentMaxID + 1;
            let postDate = getDate();
            let newPost = {
                id: postId,
                text: action.newPostBody,
                time: postDate,
                likesCount: initialLikesCount,
            };

            return {
                ...state,
                posts: [newPost, ...state.posts],
            };
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId),
            }
        }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile,
            };
        case UPDATE_USER_PROFILE_DATA:
            return {
                ...state,
                profile: action.newProfileData
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                profileIsFetching: action.isFetching,
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SET_PROFILE_PHOTO:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: {...action.photos}
                }
            };
        default:
            return state;
    }
}

export default profileReducer;

//Action Creators
export const addPost = (newPostBody) =>
    ({type: ADD_POST, newPostBody});

export const deletePost = (postId) =>
    ({type: DELETE_POST, postId});

export const setUserProfile = (profile) =>
    ({type: SET_USER_PROFILE, profile});

const updateUserProfileData = (newProfileData) =>
    ({type: UPDATE_USER_PROFILE_DATA, newProfileData})

export const setIsFetching = (isFetching) =>
    ({type: TOGGLE_IS_FETCHING, isFetching});

export const setStatus = (status) =>
    ({type: SET_STATUS, status});

const setProfilePhoto = (photos) =>
    ({type: SET_PROFILE_PHOTO, photos})

//Thunk creators
export const getUserProfile = (userId) => async (dispatch) => {
    let data = await UserAPI.getUserProfile(userId);
    dispatch(setUserProfile(data));
    dispatch(setIsFetching(false));
}

export const getUserStatus = (userId) => async (dispatch) => {
    let data = await ProfileAPI.getStatus(userId);
    dispatch(setStatus(data))
}

export const updateStatus = (status) => async (dispatch) => {
    let data = await ProfileAPI.updateStatus(status);
    if (data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const updateProfilePhoto = (photoFile) => async (dispatch) => {
    let data = await ProfileAPI.updateProfilePhoto(photoFile);
    if (data.resultCode === 0) {
        dispatch(setProfilePhoto(data.data.photos));
        dispatch(setCurrentUserProfilePhotos(data.data.photos))
    }
}

export const updateProfileData = (profileData, profile) => async (dispatch) => {

    if (Object.keys(profileData).length===0) {
        dispatch(stopSubmit("editProfileData", {_error: "Empty input form",}));
        return 1;
    } else {
        let newProfileData = {
            aboutMe: (profileData.aboutMe ? profileData.aboutMe : profile.aboutMe),
            contacts: {
                facebook: (profileData.facebook ? profileData.facebook : profile.contacts.facebook),
                website: (profileData.website ? profileData.website : profile.contacts.website),
                vk: (profileData.vk ? profileData.vk : profile.contacts.vk),
                twitter: (profileData.twitter ? profileData.twitter : profile.contacts.twitter),
                instagram: (profileData.instagram ? profileData.instagram : profile.contacts.instagram),
                youtube: (profileData.youtube ? profileData.youtube : profile.contacts.youtube),
                github: (profileData.github ? profileData.github : profile.contacts.github),
                mainLink: (profileData.mainLink ? profileData.mainLink : profile.contacts.mainLink)
            },
            lookingForAJob: (profileData.lookingForAJob ? profileData.lookingForAJob : profile.lookingForAJob),
            lookingForAJobDescription: (profileData.lookingForAJob ? profileData.lookingForAJob : profile.lookingForAJob),
            fullName: (profileData.fullName ? profileData.fullName : profile.fullName),
            userId: profile.id,
            photos: {
                small: profile.photos.small,
                large: profile.photos.large,
            }
        }

        let data = await ProfileAPI.updateProfileData(newProfileData);
        if (data.resultCode === 0) {
            dispatch(updateUserProfileData(newProfileData));
            dispatch(setCurrentUserProfile(newProfileData));
            return 0;
        } else {
            let message = data.messages.length > 0 ? data.messages[0] : "Some error";
            dispatch(stopSubmit("editProfileData", {_error: message,}));
            return 1;
        }
    }

}