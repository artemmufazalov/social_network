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
import * as axios from "axios";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";

class UsersContainer extends React.Component {

    componentDidMount() {
        this.getUsers();
    }

    getUsers = (pageNumber = 1) => {
        this.props.setIsFetching(true);
        //data.items {id:,name:,status:,photos{small:,large:},followed:}
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNumber}`,{
            withCredentials: true
        })
            .then(response => {
                this.props.setUsers(response.data.items);
                if (this.props.totalUsersCount === 0) {
                    this.props.setTotalUsersCount(response.data.totalCount);
                }
                this.props.setIsFetching(false);
            });
    }

    onPageNumberClick = (page) => {
        this.props.setCurrentPage(page);
        this.getUsers(page);
    }

    onFollow(userId) {
        axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {}, {
            withCredentials: true,
            headers: {
                'API-KEY': '4af23d3e-a1fa-432e-980b-382d82c7d9eb'
            }
        })
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.follow(userId);
                } else {
                    console.log(response.data.messages);
                }
            });
    }

    onUnFollow(userId) {
        axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {
            withCredentials: true,
            headers: {
                'API-KEY': '4af23d3e-a1fa-432e-980b-382d82c7d9eb'
            }
        })
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.unfollow(userId);
                } else {
                    console.log(response.data.messages);
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
