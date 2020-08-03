import {FollowAPI, UserAPI} from "../api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOWING_IN_PROGRESS = "TOGGLE_FOLLOWING_IN_PROGRESS";

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true,}
                    } else {
                        return u;
                    }
                }),
            };
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false,}
                    } else {
                        return u;
                    }
                }),
            };
        case SET_USERS:
            return {...state, users: action.users};
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.page};
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case TOGGLE_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : [state.followingInProgress.filter(id => id !== action.userId)]
            }
        default:
            return state;
    }
}

export default usersReducer;

export const toggleFollow = (userId) => ({type: FOLLOW, userId});
export const toggleUnfollow = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, page});
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount});
export const setIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const setFollowingInProgress = (isFetching, userId) =>
    ({type: TOGGLE_FOLLOWING_IN_PROGRESS, isFetching, userId});

export const getUsers = (pageSize, pageNumber) => {
    return (dispatch) => {
        dispatch(setIsFetching(true));
        //data.items {id:,name:,status:,photos{small:,large:},followed:}
        UserAPI.getUsers(pageSize, pageNumber)
            .then(data => {
                dispatch(setUsers(data.items));
                dispatch(setTotalUsersCount(data.totalCount));
                dispatch(setIsFetching(false));
            });
    }
}

export const follow = (userId) => {
    return (dispatch) => {
        dispatch(setFollowingInProgress(true, userId));
        FollowAPI.followRequest(userId)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(toggleFollow(userId));
                } else {
                    console.log(data.messages);
                }
                dispatch(setFollowingInProgress(false, userId));
            });
    }
}

export const unfollow = (userId) => {
    return (dispatch) => {
        dispatch(setFollowingInProgress(true, userId));
        FollowAPI.unfollowRequest(userId)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(toggleUnfollow(userId));
                } else {
                    console.log(data.messages);
                }
                dispatch(setFollowingInProgress(false, userId));
            });
    }
}

