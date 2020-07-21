import {connect} from "react-redux";
import Users from "./Users";
import {
    followActionCreator,
    setCurrentPageActionCreator, setTotalUsersCountActionCreator,
    setUsersActionCreator,
    unfollowActionCreator
} from "../../../redux/usersReducer";

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

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;