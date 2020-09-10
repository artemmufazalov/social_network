import React from "react";
import {connect} from "react-redux";

import Header from "./Header";
import {logout,} from "../../BLL/reducers/authReducer";
import {
    getAuthUserId,
    getAuthUserLogin, getCurrentUserProfile,
    getIsCurrentUserProfileFetching,
    getIsUserAuth
} from "../../BLL/selectors/authSelectors";

const HeaderContainer = (props) => {
    return (
        <Header {...props}/>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuth: getIsUserAuth(state),
        login: getAuthUserLogin(state),
        userId: getAuthUserId(state),
        isFetching: getIsCurrentUserProfileFetching(state),
        currentUserProfile: getCurrentUserProfile(state),
    }
}

export default connect(mapStateToProps, {
    logout,
})(HeaderContainer);
