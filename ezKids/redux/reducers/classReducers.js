import {
    GET_CLASS_REQUEST,
    GET_CLASS_SUCCESS, 
    GET_CLASS_FAIL, 
    GET_CLASS_RESET,

    GET_CHILDREN_REQUEST, 
    GET_CHILDREN_SUCCESS,
    GET_CHILDREN_FAIL,
    GET_CHILDREN_RESET,

} from '../constants/classConstants';


export const classStudentReducer = (state = {}, action) => {
    switch(action.type){
        case GET_CHILDREN_REQUEST:
            return {loading: true}
        
        case GET_CHILDREN_SUCCESS:
           return {loading: false, data: action.payload, success:true}
        
        case GET_CHILDREN_FAIL:
           return {loading: false, error: action.payload, success:false}

        case GET_CHILDREN_RESET:
           return {}

        default:
            return state
    }
}

export const classesReducer = (state = {}, action) => {
    switch(action.type){
        case GET_CLASS_REQUEST:
            return {loading: true}
        
        case GET_CLASS_SUCCESS:
           return {loading: false, data: action.payload, success:true}
        
        case GET_CLASS_FAIL:
           return {loading: false, error: action.payload, success:false}

        case GET_CLASS_RESET:
           return {}

        default:
            return state
    }
}