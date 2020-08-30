import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    addPost,
    getUserProfile,
    getUserStatus,
    setIsFetching, setUserProfile, updateProfilePhoto,
    updateStatus
} from "../../../redux/profileReducer";
import Preloader from "../common/Preloader/Preloader";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../../hoc/WithAuthRedirect";
import {compose} from "redux";

//TODO: refactor class using hook

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;

        this.props.setIsFetching(true);
        if (!userId || userId === this.props.myId) {
            userId = this.props.myId;
            this.props.setUserProfile(this.props.myProfile);
            this.props.setIsFetching(false);
        } else {
            this.props.getUserProfile(userId);
        }
        this.props.getUserStatus(userId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let userId = this.props.match.params.userId;

        if (!prevProps.myProfile && (userId == this.props.myId || !userId)) {
            this.props.setUserProfile(this.props.myProfile);
        }

        if (this.props.profile) {
            if (!(!prevProps.match.params.userId && !this.props.match.params.userId)) {
                if (!prevProps.match.params.userId && this.props.match.params.userId == this.props.myId) {
                } else {
                    if (userId != this.props.profile.userId) {
                        this.props.setIsFetching(true);
                        if (!userId || userId === this.props.myId) {
                            userId = this.props.myId;
                            this.props.setUserProfile(this.props.myProfile);
                            this.props.setIsFetching(false);
                        } else {
                            this.props.getUserProfile(userId);
                        }
                        this.props.getUserStatus(userId);

                    }
                }
            }
        }
    }

    render() {
        let isMyProfile = (this.props.match.params.userId == this.props.myId || !this.props.match.params.userId);
        return (
            <>
                {(this.props.profileIsFetching || this.props.authIsFetching) ? <Preloader/>
                    : <Profile profile={this.props.profile}
                               status={this.props.status}
                               updateStatus={this.props.updateStatus}
                               isMyProfile={isMyProfile}
                               updateProfilePhoto={this.props.updateProfilePhoto}

                               newPostData={this.props.newPostData}
                               posts={this.props.posts}
                               addPost={this.props.addPost}/>}

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
        setUserProfile,
        getUserStatus,
        updateStatus,
        addPost,
        updateProfilePhoto,
    }),
    withRouter,
    withAuthRedirect,
)(ProfileContainer);