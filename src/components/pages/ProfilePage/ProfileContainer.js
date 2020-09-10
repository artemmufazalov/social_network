import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";

import Profile from "./Profile";
import Preloader from "../../common/Preloader/Preloader";
import {withAuthRedirect} from "../../../hocs/WithAuthRedirect";
import {
    addPost,
    getUserProfile,
    getUserStatus,
    setIsFetching, setUserProfile, updateProfileData, updateProfilePhoto,
    updateStatus
} from "../../../BLL/reducers/profileReducer";
import {
    getPosts,
    getProfile,
    getProfileIsFetching,
    getProfilePageErros,
    getProfileStatus
} from "../../../BLL/selectors/profileSelectors";
import {
    getAuthUserId,
    getCurrentUserProfile,
    getIsCurrentUserProfileFetching
} from "../../../BLL/selectors/authSelectors";

//TODO: refactor class using hook
//TODO: get rid of == adjusting all variables to string / numeric values

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
                               updateProfileData={this.props.updateProfileData}

                               posts={this.props.posts}
                               addPost={this.props.addPost}

                               pageErrors={this.props.pageErrors}/>
                }

            </>
        );
    }
}

let mapStateToProps = (state) => ({
    profile: getProfile(state),
    profileIsFetching: getProfileIsFetching(state),
    status: getProfileStatus(state),
    posts: getPosts(state),
    myProfile: getCurrentUserProfile(state),
    myId: getAuthUserId(state),
    authIsFetching: getIsCurrentUserProfileFetching(state),
    pageErrors: getProfilePageErros(state),
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
        updateProfileData,
    }),
    withRouter,
    withAuthRedirect,
)(ProfileContainer);