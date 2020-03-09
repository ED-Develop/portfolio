import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/objectHelpers";
import {toggleIsFetching, ToggleIsFetchingActionType} from "./appReducer";
import {UserType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore";
import {Dispatch} from "redux";
import {ResultCodesEnum} from "../types/api-types";

const UN_FOLLOW = 'portfolio/users/UN-FOLLOW';
const FOLLOW = 'portfolio/users/FOLLOW';
const SET_USERS = 'portfolio/users/SET-USERS';
const SET_CURRENT_PAGE = 'portfolio/users/SET-CURRENT-PAGE';
const SET_TOTAL_COUNT = 'portfolio/users/SET-TOTAL-COUNT';
const TOGGLE_FOLLOWING_PROGRESS = 'portfolio/users/TOGGLE_FOLLOWING_PROGRESS';


let initialState = {
    usersData: [] as Array<UserType>,
    count: 6,
    currentPage: 1,
    startPage: 1,
    totalCount: 0,
    followingInProgress: [] as Array<number> //Array of user ids
};

type InitialStateType = typeof initialState;

type ActionsTypes = FollowSuccessActionType | UnFollowSuccessActionType | SetUsersActionType | SetCurrentPageActionType
    | SetTotalCountActionType | ToggleFollowingProgressActionType;

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                usersData: updateObjectInArray(state.usersData, action.userId, 'id', {followed: true})
            };
        case UN_FOLLOW:
            return {
                ...state,
                usersData: updateObjectInArray(state.usersData, action.userId, 'id', {followed: false})
            };
        case SET_USERS: {
            return {
                ...state,
                usersData: [...action.usersData]
            };
        }
        case SET_CURRENT_PAGE: {

            return {
                ...state,
                currentPage: action.currentPage
            };
        }
        case SET_TOTAL_COUNT: {
            return {
                ...state,
                totalCount: action.totalCount
            }
        }
        case TOGGLE_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)

            }
        }
        default:
            return state;
    }
};

// actions

type FollowSuccessActionType = {
    type: typeof FOLLOW,
    userId: number
}


export const followSuccess = (userId: number): FollowSuccessActionType => {
    return {
        type: FOLLOW,
        userId: userId
    };
};

type UnFollowSuccessActionType = {
    type: typeof UN_FOLLOW,
    userId: number
}

export const unFollowSuccess = (userId: number): UnFollowSuccessActionType => {
    return {
        type: UN_FOLLOW,
        userId: userId
    };
};

type SetUsersActionType = {
    type: typeof SET_USERS,
    usersData: Array<UserType>
}

export const setUsers = (users: Array<UserType>): SetUsersActionType => {
    return {
        type: SET_USERS,
        usersData: users
    };
};

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}

export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage: currentPage
    }
};

type SetTotalCountActionType = {
    type: typeof SET_TOTAL_COUNT,
    totalCount: number
}

export const setTotalCount = (totalCount: number): SetTotalCountActionType => {
    return {
        type: SET_TOTAL_COUNT,
        totalCount: totalCount
    }
};

type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_FOLLOWING_PROGRESS,
    isFetching: boolean,
    userId: number
}

export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => {
    return {
        type: TOGGLE_FOLLOWING_PROGRESS,
        isFetching,
        userId
    }
};

//thunks

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes | ToggleIsFetchingActionType>;

export const getUsers = (count: number, currentPage: number): ThunkType => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let data = await usersAPI.getUsers(count, currentPage);

    dispatch(setUsers(data.items));
    dispatch(setTotalCount(data.totalCount));
    dispatch(toggleIsFetching(false));
    dispatch(setCurrentPage(currentPage));
};

export const searchUsers = (userName: string): ThunkType => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let data = await usersAPI.searchUsers(userName);

    dispatch(setUsers(data.items));
    dispatch(toggleIsFetching(false));
};

type  FlowActionsTypes = FollowSuccessActionType | UnFollowSuccessActionType;

const followUnfollowFlow = async (apiMethod: (userId: number) => Promise<number>,
                                  dispatch: Dispatch<ActionsTypes>, userId: number,
                                  actionCreator: (userId: number) => FlowActionsTypes) => {
    dispatch(toggleFollowingProgress(true, userId));
    let resultCode = await apiMethod(userId);

    if (resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => async (dispatch) => {
    followUnfollowFlow(usersAPI.follow.bind(usersAPI), dispatch, userId, followSuccess);
};
export const unFollow = (userId: number) => (dispatch: any) => {
    followUnfollowFlow(usersAPI.unFollow.bind(usersAPI), dispatch, userId, unFollowSuccess);
};

export default usersReducer;