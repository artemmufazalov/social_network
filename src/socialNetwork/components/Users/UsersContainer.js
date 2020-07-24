import {connect} from "react-redux";
import {
    follow,
    setCurrentPage,
    setIsFetching,
    setTotalUsersCount,
    setUsers,
    unfollow
} from "../../../redux/usersReducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {FollowAPI, UserAPI} from "../../../api/api";

class UsersContainer extends React.Component {

    componentDidMount() {
        this.getUsers();
    }

    getUsers = (pageNumber = 1) => {
        this.props.setIsFetching(true);
        //data.items {id:,name:,status:,photos{small:,large:},followed:}
        UserAPI.getUsers(this.props.pageSize, pageNumber)
            .then(data => {
                this.props.setUsers(data.items);
                if (this.props.totalUsersCount === 0) {
                    this.props.setTotalUsersCount(data.totalCount);
                }
                this.props.setIsFetching(false);
            });
    }

    onPageNumberClick = (page) => {
        this.props.setCurrentPage(page);
        this.getUsers(page);
    }

    onFollow(userId) {
        FollowAPI.followRequest(userId)
            .then(data => {
                if (data.resultCode === 0) {
                    this.props.follow(userId);
                } else {
                    console.log(data.messages);
                }
            });
    }

    onUnFollow(userId) {
        FollowAPI.unfollowRequest(userId)
            .then(data => {
                if (data.resultCode === 0) {
                    this.props.unfollow(userId);
                } else {
                    console.log(data.messages);
                }
            });
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
                        follow={(userId) => {
                            this.onFollow(userId)
                        }}
                        unfollow={(userId) => {
                            this.onUnFollow(userId)
                        }}
                        setCurrentPage={this.props.setCurrentPage}
                        onPageNumberClick={this.onPageNumberClick}
                    />}
            </>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
    }
}

export default connect(mapStateToProps,
    {
        follow,
        unfollow,
        setUsers,
        setCurrentPage,
        setTotalUsersCount,
        setIsFetching,
    })(UsersContainer);
