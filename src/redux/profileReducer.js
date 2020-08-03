import {getDate} from "./timeFunctions";
import {UserAPI} from "../api/api";

const ADD_POST = "ADD_POST";
const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

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
    newPost: {
        text: ""
    },
    profile: null,
    profileIsFetching: true,
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
                text: state.newPost.text,
                time: postDate,
                likesCount: initialLikesCount,
            };

            return {
                ...state,
                posts: [newPost, ...state.posts],
                newPost: {
                    ...state.newPost,
                    text: "",
                },
            };
        }
        case UPDATE_NEW_POST_TEXT: {
            //{newText:""}

            return {
                ...state,
                newPost: {
                    ...state.newPost,
                    text: action.newText,
                },
            };
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
        default:
            return state;
    }
}

export const addPost = () => ({type: ADD_POST});

export const updateNewPostText = (text) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text});

export const setUserProfile = (profile) =>
    ({type: SET_USER_PROFILE, profile});

export const setIsFetching = (isFetching) =>
    ({type: TOGGLE_IS_FETCHING, isFetching});

export const getUserProfile = (userId) => {
    return (dispatch) => {
        UserAPI.getUserProfile(userId)
            .then(data => {
                dispatch(setUserProfile(data));
                dispatch(setIsFetching(false));
            });
    }
}