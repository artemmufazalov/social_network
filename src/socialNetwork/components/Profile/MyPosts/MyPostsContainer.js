import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../../redux/postsReducer";
import {connect} from "react-redux";
import MyPosts from "./MyPosts";

let mapStateToProps = (state) => {
    return {
        newPostData:state.postsData.newPost,
        postsData:state.postsData,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addNewPost: ()=>{
            dispatch(addPostActionCreator());
        },
        onPostChange: (text)=>{
            dispatch(updateNewPostTextActionCreator(text));
        },
    }
}

const MyPostContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts);

export default MyPostContainer;