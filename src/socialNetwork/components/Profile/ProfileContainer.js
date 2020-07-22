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
        if (!userId) {
            this.props.setUserProfile(this.props.myProfile);
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
        this.props.setIsFetching(true);
    }

    render() {

        return (
            <>
                {this.props.profileIsFetching ? <Preloader/> : <Profile {...this.props}/>}
            </>
        );
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    profileIsFetching: state.profilePage.profileIsFetching,
    myProfile: state.profilePage.myProfile,
});

let WithURLDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {
    setUserProfile,
    setIsFetching,
})(WithURLDataContainerComponent);