import {auth} from "./authReducer";

//Action types
const SET_INITIALIZED_SUCCESS = 'appReducer/SET_INITIALIZED_SUCCESS';

//Initial state
let initialState = {
    initialized: false,
}

//Reducer
const appReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

export default appReducer;

//Action creators
const setInitializedSuccess = () =>
    ({type: SET_INITIALIZED_SUCCESS});

//Thunk creators
export const initializeApp = () => (dispatch) => {
    let promise = dispatch(auth());
    Promise.all([promise]).then(() => {
        dispatch(setInitializedSuccess());
    })
}