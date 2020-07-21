import {addPost, updateNewPostText} from "../../../../redux/postsReducer";
import {connect} from "react-redux";
import MyPosts from "./MyPosts";

let mapStateToProps = (state) => {
    return {
        newPostData: state.postsData.newPost,
        postsData: state.postsData,
    }
}

const MyPostContainer = connect(mapStateToProps, {
    addPost,
    updateNewPostText
})(MyPosts);

export default MyPostContainer;