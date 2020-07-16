import {getDate} from "./timeFunctions";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

export const postsReducer = (state, action) => {

    switch (action.type) {
        case ADD_POST:
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
            state.posts.unshift(newPost);
            state.newPost.text = "";
            return state;
        case UPDATE_NEW_POST_TEXT:
            //{newText:""}
            state.newPost.text = action.newText;
            return state;
        default:
            return state;
    }
}

export const addPostActionCreator = () => ({type: ADD_POST});

export const updateNewPostTextActionCreator = (text) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text});