import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    addPost,
    getUserProfile,
    getUserStatus,
    setIsFetching,
    updateStatus
} from "../../../redux/profileReducer";
import Preloader from "../common/Preloader/Preloader";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../../hoc/WithAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    componentDidMount() {
        this.props.setIsFetching(true);
        let userId = this.props.match.params.userId;
        if (!userId || userId === this.props.myId) {
            this.props.setIsFetching(false);
            userId = this.props.myId;
        } else {
            this.props.getUserProfile(userId);
        }
        this.props.getUserStatus(userId);
    }

    render() {
        let isMyProfile = (this.props.match.params.userId == this.props.myId || !this.props.match.params.userId);
        return (
            <>
                {(this.props.profileIsFetching || this.props.authIsFetching) ? <Preloader/>
                    : (isMyProfile) ?
                        <Profile profile={this.props.myProfile}
                                 status={this.props.status}
                                 updateStatus={this.props.updateStatus}
                                 isMyProfile={isMyProfile}

                                 newPostData={this.props.newPostData}
                                 posts={this.props.posts}
                                 addPost={this.props.addPost}
                                 updateNewPostText={this.props.updateNewPostText}

                        />
                        :
                        <Profile profile={this.props.profile}
                                 status={this.props.status}
                                 updateStatus={this.props.updateStatus}
                                 isMyProfile={isMyProfile}

                                 newPostData={this.props.newPostData}
                                 posts={this.props.posts}
                                 addPost={this.props.addPost}
                                 updateNewPostText={this.props.updateNewPostText}
                        />}

            </>
        );
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    profileIsFetching: state.profilePage.profileIsFetching,
    myProfile: state.auth.currentUserProfile,
    myId: state.auth.id,
    authIsFetching: state.auth.isFetching,
    status: state.profilePage.status,
    newPostData: state.profilePage.newPost,
    posts: state.profilePage.posts,
});

export default compose(
    connect(mapStateToProps, {
        setIsFetching,
        getUserProfile,
        getUserStatus,
        updateStatus,
        addPost,
    }),
    withRouter,
    withAuthRedirect,
)(ProfileContainer);