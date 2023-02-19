import {
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_LOGIN_FAIL,

    USER_FORGET_REQUEST, 
    USER_FORGET_SUCCESS,
    USER_FORGET_RESET,
    USER_FORGET_FAIL,
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {loading: true}
        
        case USER_LOGIN_SUCCESS:
           return {loading: false, userInfo: action.payload, loggedIn: true}
        
        case USER_LOGIN_FAIL:
           return {loading: false, error: action.payload}

        case USER_LOGOUT:
           return {}

        default:
            return state
    }
}

export const userForgetReducer = (state = {}, action) => {
    switch(action.type){
        case USER_FORGET_REQUEST:
            return {loading: true}
        
        case USER_FORGET_SUCCESS:
           return {loading: false, data: action.payload, e:false}
        
        case USER_FORGET_FAIL:
           return {loading: false, error: action.payload, e:true}

        case USER_FORGET_RESET:
           return {}

        default:
            return state
    }
}

