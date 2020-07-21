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
        this.props.setUsers([]);
        //data.items {id:,name:,status:,photos{small:,large:},followed:}
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNumber}`)
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

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users
                    users={this.props.users}
                    pageSize={this.props.pageSize}
                    totalUsersCount={this.props.totalUsersCount}
                    currentPage={this.props.currentPage}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    setCurrentPage={this.props.setCurrentPage}
                    onPageNumberClick={this.onPageNumberClick}
                />
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
