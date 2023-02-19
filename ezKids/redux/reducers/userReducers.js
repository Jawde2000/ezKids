import {
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_LOGIN_FAIL,

    USER_FORGET_REQUEST, 
    USER_FORGET_SUCCESS,
    USER_FORGET_RESET,
    USER_FORGET_FAIL,

    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS,
    USER_REGISTER_RESET,
    USER_REGISTER_FAIL,

    USER_UPDATE_REQUEST, 
    USER_UPDATE_SUCCESS,
    USER_UPDATE_RESET,
    USER_UPDATE_FAIL,

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

export const userRegisterReducer = (state = {}, action) => {
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading: true}
        
        case USER_REGISTER_SUCCESS:
           return {loading: false, data: action.payload, e:false}
        
        case USER_REGISTER_FAIL:
           return {loading: false, error: action.payload, e:true}

        case USER_REGISTER_RESET:
           return {}

        default:
            return state
    }
}

export const userUpdateReducer = (state = {}, action) => {
    switch(action.type){
        case USER_UPDATE_REQUEST:
            return {loading: true}
        
        case USER_UPDATE_SUCCESS:
           return {loading: false, data: action.payload, e:false}
        
        case USER_UPDATE_FAIL:
           return {loading: false, error: action.payload, e:true}

        case USER_UPDATE_RESET:
           return {}

        default:
            return state
    }
}

