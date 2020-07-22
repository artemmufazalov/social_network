import {addPost, updateNewPostText} from "../../../../redux/profileReducer";
import {connect} from "react-redux";
import MyPosts from "./MyPosts";

let mapStateToProps = (state) => {
    return {
        newPostData: state.profilePage.newPost,
        posts: state.profilePage.posts,
        profile:state.profilePage.profile,
    }
}

const MyPostContainer = connect(mapStateToProps, {
    addPost,
    updateNewPostText
})(MyPosts);

export default MyPostContainer;