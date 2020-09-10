import React, {useEffect} from "react";
import {connect} from "react-redux";
import {compose} from "redux";

import Users from "./Users";
import Preloader from "../../common/Preloader/Preloader";
import {withAuthRedirect} from "../../../hocs/WithAuthRedirect";
import {
    requestUsers, follow, unfollow,
    setCurrentPage,
} from "../../../BLL/reducers/usersReducer";
import {
    getCurrentPage,
    getIsFetching, getIsFollowingProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../../BLL/selectors/usersSelectors";

const UsersContainer = (props) => {

    const {
        isFetching,
        users,
        totalUsersCount,
        pageSize,
        currentPage,
        isFollowingInProgress,
        follow,
        unfollow,
        setCurrentPage,
        requestUsers
    } = props;

    useEffect(() => {
        requestUsers(pageSize, currentPage);
    }, [requestUsers, pageSize, currentPage])

    const onPageNumberClick = (page) => {
        setCurrentPage(page);
        requestUsers(pageSize, page);
    }

    return (
        <>
            {isFetching ? <Preloader/>
                : <Users
                    users={users}
                    pageSize={pageSize}
                    totalUsersCount={totalUsersCount}
                    currentPage={currentPage}
                    follow={follow}
                    unfollow={unfollow}
                    setCurrentPage={setCurrentPage}
                    onPageNumberClick={onPageNumberClick}
                    isFollowingInProgress={isFollowingInProgress}
                />}
        </>
    );
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
