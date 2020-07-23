import React from "react";
import Header from "./Header";
import * as axios from "axios";
import {connect} from "react-redux";
import {setAuthUserData, setCurrentProfileIsFetching, setCurrentUserProfile} from "../../../redux/authReducer";

class HeaderContainer extends React.Component {

    componentDidMount() {

        axios.get('https://social-network.samuraijs.com/api/1.0/auth/me',
            {withCredentials: true})
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, login, email} = response.data.data;
                    this.props.setAuthUserData(id, login, email);
                    this.props.setCurrentProfileIsFetching(true);
                    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${this.props.userId}`)
                        .then(response => {
                            this.props.setCurrentUserProfile(response.data);
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
