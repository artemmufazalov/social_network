import {connect} from "react-redux";
import {
    requestUsers, follow, unfollow,
    setCurrentPage,
} from "../../../redux/usersReducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getIsFetching, getIsFollowingProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../../redux/usersSelectors";

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.requestUsers(this.props.pageSize, this.props.currentPage);

    }

    onPageNumberClick = (page) => {
        this.props.setCurrentPage(page);
        this.props.requestUsers(this.props.pageSize, page);
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/>
                    : <Users
                        users={this.props.users}
                        pageSize={this.props.pageSize}
                        totalUsersCount={this.props.totalUsersCount}
                        currentPage={this.props.currentPage}
                        follow={this.props.follow}
                        unfollow={this.props.unfollow}
                        setCurrentPage={this.props.setCurrentPage}
                        onPageNumberClick={this.onPageNumberClick}
                        isFollowingInProgress={this.props.isFollowingInProgress}
                    />}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowingInProgress: getIsFollowingProgress(state),
    }
}

export default compose(
    connect(mapStateToProps, {
        follow,
        unfollow,
        setCurrentPage,
        requestUsers,
    }),
    withAuthRedirect,
)(UsersContainer)
