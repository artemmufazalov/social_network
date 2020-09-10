import React, {useLayoutEffect} from "react";
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

const ProfileContainer = React.memo((props) => {

    const {
        myId,
        myProfile,
        authIsFetching,
        profileIsFetching,
        profile,
        status,
        posts,
        pageErrors,
        setIsFetching,
        setUserProfile,
        getUserProfile,
        getUserStatus,
        updateStatus,
        updateProfilePhoto,
        updateProfileData,
        addPost
    } = props;

    useLayoutEffect(() => {
        let userId = props.match.params.userId;
        setIsFetching(true);
        if (!userId || userId.toString() === myId.toString()) {
            userId = myId;
            setUserProfile(myProfile);
            setIsFetching(false);
        } else {
            getUserProfile(userId);
        }
        getUserStatus(userId);
    }, [props.match.params.userId, myId, myProfile, setUserProfile, setIsFetching, getUserProfile, getUserStatus])

    let isMyProfile = (!props.match.params.userId || props.match.params.userId.toString() === myId.toString());

    return (
        <>
            {(profileIsFetching || authIsFetching) ? <Preloader/>
                : <Profile profile={profile}
                           status={status}
                           updateStatus={updateStatus}
                           isMyProfile={isMyProfile}
                           updateProfilePhoto={updateProfilePhoto}
                           updateProfileData={updateProfileData}

                           posts={posts}
                           addPost={addPost}

                           pageErrors={pageErrors}/>
            }

        </>
    );

})

const mapStateToProps = (state) => ({
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