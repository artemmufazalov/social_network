import {FollowAPI, UserAPI} from "../../api/api";
import {updateObjectInArray} from "../../utils/helpers/helpers";

//Action types
const FOLLOW = "usersReducer/FOLLOW";
const UNFOLLOW = "usersReducer/UNFOLLOW";
const SET_USERS = "usersReducer/SET_USERS";
const SET_CURRENT_PAGE = "usersReducer/SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "usersReducer/SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "usersReducer/TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOWING_IN_PROGRESS = "usersReducer/TOGGLE_FOLLOWING_IN_PROGRESS";

//Initial state
let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
};

//Reducer
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users,action.userId,"id",{followed:true})
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users,action.userId,"id",{followed:false})
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

//Action creators
export const toggleFollow = (userId) => ({type: FOLLOW, userId});
export const toggleUnfollow = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, page});
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount});
export const setIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const setFollowingInProgress = (isFetching, userId) =>
    ({type: TOGGLE_FOLLOWING_IN_PROGRESS, isFetching, userId});

//Thunk creators
export const requestUsers = (pageSize, pageNumber) => async (dispatch) => {
    dispatch(setIsFetching(true));
    let data = await UserAPI.getUsers(pageSize, pageNumber);
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
    dispatch(setIsFetching(false));
}

const FollowUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(setFollowingInProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    } else {
        console.log(data.messages);
    }
    dispatch(setFollowingInProgress(false, userId));
}

export const follow = (userId) => async (dispatch) => {
    await FollowUnfollowFlow(dispatch, userId, FollowAPI.followRequest.bind(FollowAPI), toggleFollow);
}

export const unfollow = (userId) => async (dispatch) => {
    await FollowUnfollowFlow(dispatch, userId, FollowAPI.unfollowRequest.bind(FollowAPI), toggleUnfollow);
}

