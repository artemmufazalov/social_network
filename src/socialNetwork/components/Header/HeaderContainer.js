import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {setAuthUserData, setCurrentProfileIsFetching, setCurrentUserProfile} from "../../../redux/authReducer";
import {AuthAPI, UserAPI} from "../../../api/api";


class HeaderContainer extends React.Component {

    componentDidMount() {

        AuthAPI.authMe()
            .then(data => {
                if (data.resultCode === 0) {
                    let {id, login, email} = data.data;
                    this.props.setAuthUserData(id, login, email);
                    this.props.setCurrentProfileIsFetching(true);
                    UserAPI.getUserProfile(this.props.userId)
                        .then(data => {
                            this.props.setCurrentUserProfile(data);
                            this.props.setCurrentProfileIsFetching(false);
                        })
                }
            });

    }

    render() {
        return (
            <Header {...this.props}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        userId: state.auth.id,
        currentUserProfile: state.auth.currentUserProfile,
        isFetching:state.auth.isFetching,
    }
}

export default connect(mapStateToProps, {
    setAuthUserData,
    setCurrentUserProfile,
    setCurrentProfileIsFetching,
})(HeaderContainer);
