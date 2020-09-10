import {stopSubmit} from "redux-form";

import {getDateString} from "../../utils/functions/timeFunctions";
import {ProfileAPI, UserAPI} from "../../api/api";
import {setCurrentUserProfile, setCurrentUserProfilePhotos} from "./authReducer";


//Action types
const ADD_POST = "profileReducer/ADD_POST";
const SET_USER_PROFILE = "profileReducer/SET_USER_PROFILE";
const TOGGLE_IS_FETCHING = "profileReducer/TOGGLE_IS_FETCHING";
const SET_STATUS = "profileReducer/SET_STATUS";
const DELETE_POST = "profileReducer/DELETE_POST";
const SET_PROFILE_PHOTO = "profileReducer/SET_PROFILE_PHOTO";
const UPDATE_USER_PROFILE_DATA = "profileReducer/UPDATE_USER_PROFILE_DATA"
const SET_UNSUCCESSFUL_PHOTO_UPLOAD_STATUS = "profileReducer/SET_UNSUCCESSFUL_PHOTO_UPLOAD_STATUS"

//Initial state
let initialState = {
    posts: [
        {
            id: 101,
            text: "Hello World, I'm the first post",
            time: "29.06.2020",
            likesCount: 0,
        },
        {
            id: 102,
            text: "I really appreciate this app and the opportunity to write and store my thoughts and feelings here",
            time: "01.07.2020",
            likesCount: 3,
        },
        {
            id: 103,
            text: "This text was supposed to have some motivational meaning but I am to busy with my codding staff",
            time: "03.07.2020",
            likesCount: 8,
        }
    ],
    profile: null,
    profileIsFetching: true,
    status: "",
    pageErrors: {
        photoUploadError: null,
    }
};

//Reducer
const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            let initialLikesCount = 0;
            let currentMaxID = state.posts[0].id;
            let postId = currentMaxID + 1;
            let postDate = getDateString();
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
        case SET_UNSUCCESSFUL_PHOTO_UPLOAD_STATUS:
            return {
                ...state,
                pageErrors: {
                    ...state.pageErrors,
                    ...action.payload
                }
            }
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

const setUnsuccessfulPhotoUploadStatus = (photoUploadError) =>
    ({type: SET_UNSUCCESSFUL_PHOTO_UPLOAD_STATUS, payload: {photoUploadError}})

//Thunk creators
//TODO: add try-catch for all thunks

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
    try {
        let data = await ProfileAPI.updateStatus(status);
        if (data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    } catch (error) {
        alert(error);
    }
}

export const updateProfilePhoto = (photoFile) => async (dispatch) => {
    if (photoFile){
        let data = {};
        try {
            data = await ProfileAPI.updateProfilePhoto(photoFile);
            if (data.resultCode === 0) {
                dispatch(setProfilePhoto(data.data.photos));
                dispatch(setCurrentUserProfilePhotos(data.data.photos))
                return 0;
            }
        } catch (error) {
            let message = data.messages ?
                data.messages.length > 0 ? data.messages[0]
                    : "Some server or connection error"
                : "Some server or connection error";
            dispatch(setUnsuccessfulPhotoUploadStatus(message))
            return 1;
        }
    } else{
        dispatch(setUnsuccessfulPhotoUploadStatus("Photo isn't selected"))
        return 1;
    }

}

export const updateProfileData = (profileData) => async (dispatch) => {

    if (Object.keys(profileData).length === 0) {
        dispatch(stopSubmit("editProfileData", {_error: "Empty input form",}));
        return 1;
    } else {
        let data = await ProfileAPI.updateProfileData(profileData);
        if (data.resultCode === 0) {
            dispatch(updateUserProfileData(profileData));
            dispatch(setCurrentUserProfile(profileData));
            return 0;
        } else {
            let message = data.messages.length > 0 ? data.messages[0] : "Some error";
            dispatch(stopSubmit("editProfileData", {_error: message,}));
            return 1;
        }
    }

}