import React from "react";
import Profile from "./Profile";
import * as axios from "axios";
import {connect} from "react-redux";
import {setIsFetching, setUserProfile} from "../../../redux/profileReducer";
import Preloader from "../common/Preloader/Preloader";
import {withRouter} from "react-router-dom";

class ProfileContainer extends React.Component {

    componentDidMount() {
        this.props.setIsFetching(true);
        let userId = this.props.match.params.userId;
        if (!userId || userId === this.props.myId) {
            this.props.setIsFetching(false);
        } else {
            axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
                .then(response => {
                    this.props.setUserProfile(response.data);
                    if (this.props.profile != null) {
                        this.props.setIsFetching(false);
                    }
                });
        }
    }

    componentWillUnmount() {
    }

    render() {

        return (
            <>
                {(this.props.profileIsFetching || this.props.authIsFetching) ? <Preloader/>
                    : ((!this.props.match.params.userId) || (this.props.match.params.userId == this.props.myId)) ?
                        <Profile profile={this.props.myProfile}/>
                        :
                        <Profile profile={this.props.profile}/>}

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

});

let WithURLDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {
    setUserProfile,
    setIsFetching,
})(WithURLDataContainerComponent);