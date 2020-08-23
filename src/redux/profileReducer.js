import {getDate} from "../utils/functions/timeFunctions";
import {ProfileAPI, UserAPI} from "../api/api";

//Action types
const ADD_POST = "profileReducer/ADD_POST";
const SET_USER_PROFILE = "profileReducer/SET_USER_PROFILE";
const TOGGLE_IS_FETCHING = "profileReducer/TOGGLE_IS_FETCHING";
const SET_STATUS = "profileReducer/SET_STATUS";
const DELETE_POST = "profileReducer/DELETE_POST";

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

export default profileReducer;

//Action Creators
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
    let data = await ProfileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}