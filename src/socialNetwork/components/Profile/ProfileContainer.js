import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, setIsFetching, updateStatus} from "../../../redux/profileReducer";
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
        } else {
            this.props.getUserProfile(userId);
        }
        this.props.getUserStatus(userId);
    }

    componentWillUnmount() {
    }

    render() {
        let myProfile = (this.props.match.params.userId == this.props.myId||!this.props.match.params.userId);
        return (
            <>
                {(this.props.profileIsFetching || this.props.authIsFetching) ? <Preloader/>
                    : (myProfile) ?
                        <Profile profile={this.props.myProfile}
                                 status={this.props.status}
                                 updateStatus={this.props.updateStatus}
                                 myProfile={myProfile}/>
                        :
                        <Profile profile={this.props.profile}
                                 status={this.props.status}
                                 updateStatus={this.props.updateStatus}
                                 myProfile={myProfile}/>}

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

});

export default compose(
    connect(mapStateToProps, {
        setIsFetching,
        getUserProfile,
        getUserStatus,
        updateStatus,
    }),
    withRouter,
    withAuthRedirect,
)(ProfileContainer);