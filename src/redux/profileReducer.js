import {getDate} from "./timeFunctions";
import {ProfileAPI, UserAPI} from "../api/api";

const ADD_POST = "ADD_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";

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

export const profileReducer = (state = initialState, action) => {

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
        default:
            return state;
    }
}

export const addPost = (newPostBody) =>
    ({type: ADD_POST, newPostBody});

export const deletePost = (postId) =>
    ({type: DELETE_POST, postId});

export const setUserProfile = (profile) =>
    ({type: SET_USER_PROFILE, profile});

export const setIsFetching = (isFetching) =>
    ({type: TOGGLE_IS_FETCHING, isFetching});

export const setStatus = (status) =>
    ({type: SET_STATUS, status});

export const getUserProfile = (userId) => {
    return (dispatch) => {
        UserAPI.getUserProfile(userId)
            .then(data => {
                dispatch(setUserProfile(data));
                dispatch(setIsFetching(false));
            });
    }
}

export const getUserStatus = (userId) => (dispatch) => {
    ProfileAPI.getStatus(userId)
        .then(data => {
            dispatch(setStatus(data))
        });
}

export const updateStatus = (status) => (dispatch) => {
    ProfileAPI.updateStatus(status)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setStatus(status));
            } else {
                console.log(data.messages);
            }
        });
}