import {getDate} from "./timeFunctions";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

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
    }
};

export const postsReducer = (state = initialState, action) => {

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

            let stateCopy = {...state};
            stateCopy.posts = [...state.posts];

            //stateCopy.posts.unshift(newPost);
            stateCopy.posts.unshift(newPost);
            stateCopy.newPost.text = "";
            return stateCopy;
        }
        case UPDATE_NEW_POST_TEXT: {
            //{newText:""}
            let stateCopy = {...state};
            stateCopy.newPost = {...state.newPost};
            stateCopy.newPost.text = action.newText;
            return stateCopy;
        }
        default:
            return state;
    }
}

export const addPostActionCreator = () => ({type: ADD_POST});

export const updateNewPostTextActionCreator = (text) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text});