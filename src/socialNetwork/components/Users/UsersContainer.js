import {connect} from "react-redux";
import {
    followActionCreator,
    setCurrentPageActionCreator, setTotalUsersCountActionCreator,
    setUsersActionCreator,
    unfollowActionCreator
} from "../../../redux/usersReducer";
import React from "react";
import * as axios from "axios";
import Users from "./Users";

class UsersContainer extends React.Component {

    componentDidMount() {
        this.getUsers();
    }

    getUsers = (pageNumber = 1) => {
        //data.items {id:,name:,status:,photos{small:,large:},followed:}
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNumber}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                if (this.props.totalUsersCount === 0) {
                    this.props.setTotalUsersCount(response.data.totalCount);
                }
            });
    }

    onPageNumberClick = (page) => {
        this.props.setCurrentPage(page);
        this.getUsers(page);
    }

    render() {
        return (
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
        );
    }
}

const mapStateToProps = (state) => {

    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId)=>{
            dispatch(followActionCreator(userId));
        },
        unfollow: (userId)=>{
            dispatch(unfollowActionCreator(userId));
        },
        setUsers: (users)=>{
            dispatch(setUsersActionCreator(users));
        },
        setCurrentPage: (page)=>{
            dispatch(setCurrentPageActionCreator(page));
        },
        setTotalUsersCount: (totalUsersCount) => {
            dispatch(setTotalUsersCountActionCreator(totalUsersCount))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
