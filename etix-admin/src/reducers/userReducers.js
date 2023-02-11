import {
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    
    USER_LOGOUT,

    USER_LIST_REQUEST, 
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,

    USER_DETAIL_REQUEST, 
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAIL,
    USER_DETAIL_RESET,

    USER_DELETE_REQUEST, 
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_DELETE_RESET,

    USER_CUSTOMER_REGISTER_REQUEST, 
    USER_CUSTOMER_REGISTER_SUCCESS,
    USER_CUSTOMER_REGISTER_FAIL,
    USER_CUSTOMER_REGISTER_RESET,

    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_RESET,

    USER_VENDOR_REGISTER_REQUEST, 
    USER_VENDOR_REGISTER_SUCCESS,
    USER_VENDOR_REGISTER_FAIL,
    USER_VENDOR_REGISTER_RESET,

    USER_TEACHER_UPDATE_REQUEST, 
    USER_TEACHER_UPDATE_SUCCESS,
    USER_TEACHER_UPDATE_FAIL,
    USER_TEACHER_UPDATE_RESET,

    USER_CUSTOMER_UPDATE_REQUEST, 
    USER_CUSTOMER_UPDATE_SUCCESS,
    USER_CUSTOMER_UPDATE_FAIL,
    USER_CUSTOMER_UPDATE_RESET,

    USER_UPDATE_REQUEST, 
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,

    TEACHER_TOTAL_REQUEST,
    TEACHER_TOTAL_SUCCESS, 
    TEACHER_TOTAL_FAIL, 
    TEACHER_TOTAL_RESET,

    NEW_TEACHER_REQUEST,
    NEW_TEACHER_SUCCESS,
    NEW_TEACHER_FAIL,
    NEW_TEACHER_RESET,

    CHILDREN_DEMOGRAPHIC_GENDER_REQUEST,
    CHILDREN_DEMOGRAPHIC_GENDER_SUCCESS,
    CHILDREN_DEMOGRAPHIC_GENDER_FAIL,
    CHILDREN_DEMOGRAPHIC_GENDER_RESET,

    INDIVIDUAL_TEACHER_REQUEST,
    INDIVIDUAL_TEACHER_SUCCESS,
    INDIVIDUAL_TEACHER_FAIL,
    INDIVIDUAL_TEACHER_RESET,

    NEW_PARENT_REQUEST,
    NEW_PARENT_SUCCESS,
    NEW_PARENT_RESET,
    NEW_PARENT_FAIL,

    PARENT_REQUEST,
    PARENT_SUCCESS,
    PARENT_RESET,
    PARENT_FAIL,

    INDIVIDUAL_PARENT_REQUEST,
    INDIVIDUAL_PARENT_SUCCESS,
    INDIVIDUAL_PARENT_RESET,
    INDIVIDUAL_PARENT_FAIL,

    USER_PARENT_UPDATE_REQUEST,
    USER_PARENT_UPDATE_SUCCESS,
    USER_PARENT_UPDATE_RESET,
    USER_PARENT_UPDATE_FAIL,


    CHILDREN_DETAILS_REQUEST,
    CHILDREN_DETAILS_SUCCESS,
    CHILDREN_DETAILS_RESET,
    CHILDREN_DETAILS_FAIL,

    CHILDREN_ADD_REQUEST,
    CHILDREN_ADD_SUCCESS,
    CHILDREN_ADD_RESET,
    CHILDREN_ADD_FAIL,

    GLOBAL_RANKING_REQUEST,
    GLOBAL_RANKING_SUCCESS,
    GLOBAL_RANKING_RESET,
    GLOBAL_RANKING_FAIL,

    CLASS_RANKING_REQUEST,
    CLASS_RANKING_SUCCESS,
    CLASS_RANKING_FAIL,
    CLASS_RANKING_RESET,

    CLASS_COMPARISION_REQUEST,
    CLASS_COMPARISION_SUCCESS,
    CLASS_COMPARISION_FAIL,
    CLASS_COMPARISION_RESET,

    NOTICATION_REQUEST, 
    NOTICATION_SUCCESS, 
    NOTICATION_FAIL,
    NOTICATION_RESET,

    NEW_NOTICATION_REQUEST,
    NEW_NOTICATION_SUCCESS,
    NEW_NOTICATION_FAIL,
    NEW_NOTICATION_RESET,

    CHILDREN_DELETE_REQUEST,
    CHILDREN_DELETE_SUCCESS,
    CHILDREN_DELETE_FAIL,
    CHILDREN_DELETE_RESET,

    INDIVIDUAL_CHILDREN_REQUEST,
    INDIVIDUAL_CHILDREN_SUCCESS,
    INDIVIDUAL_CHILDREN_FAIL,
    INDIVIDUAL_CHILDREN_RESET,

    INDIVIDUAL_RESULT_REQUEST,
    INDIVIDUAL_RESULT_SUCCESS,
    INDIVIDUAL_RESULT_FAIL,
    INDIVIDUAL_RESULT_RESET,

    CHILDREN_UPDATE_REQUEST,
    CHILDREN_UPDATE_SUCCESS,
    CHILDREN_UPDATE_FAIL,
    CHILDREN_UPDATE_RESET,
} from '../constants/userConstants'

export const userLoginReducer = (state = { }, action) => {
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {loading: true}
        
        case USER_LOGIN_SUCCESS:
           return {loading: false, userInfo: action.payload}
        
        case USER_LOGIN_FAIL:
           return {loading: false, error: action.payload}

        case USER_LOGOUT:
           return {}

        default:
            return state
    }
}

export const userListReducer = (state = { users: [] }, action) => {
    switch(action.type){
        case USER_LIST_REQUEST:
            return {loading: true}
        
        case USER_LIST_SUCCESS:
           return {loading: false, users: action.payload}
        
        case USER_LIST_FAIL:
           return {loading: false, error: action.payload}

        case USER_LIST_RESET:
           return {users:[]}

        default:
            return state
    }
}

export const userDetailReducer = (state = { }, action) => {
    switch(action.type){
        case USER_DETAIL_REQUEST:
            return {loading: true}
        
        case USER_DETAIL_SUCCESS:
           return {loading: false, userD: action.payload}
        
        case USER_DETAIL_FAIL:
           return {loading: false, error: action.payload}

        case USER_DETAIL_RESET:
           return {}

        default:
            return state
    }
}

export const userDeleteReducer = (state = { }, action) => {
    switch(action.type){
        case USER_DELETE_REQUEST:
            return {loading: true}
        
        case USER_DELETE_SUCCESS:
           return {loading: false, success: true}
        
        case USER_DELETE_FAIL:
           return {loading: false, error: action.payload}
        
        case USER_DELETE_RESET:
            return {}

        default:
            return state
    }
}

export const customerRegisterReducer = (state = { }, action) => {
    switch(action.type){
        case USER_CUSTOMER_REGISTER_REQUEST:
            return {loading: true}
        
        case USER_CUSTOMER_REGISTER_SUCCESS:
           return {loading: false, success: true}
        
        case USER_CUSTOMER_REGISTER_FAIL:
           return {loading: false, error: action.payload}

        case USER_CUSTOMER_REGISTER_RESET:
            return {}

        default:
            return state
    }
}

export const adminRegisterReducer = (state = {}, action) =>{
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading: true}
        
        case USER_REGISTER_SUCCESS:
           return {loading: false, success: true}
        
        case USER_REGISTER_FAIL:
           return {loading: false, error: action.payload}

        case USER_REGISTER_RESET:
            return {}

        default:
            return state
    }
}

export const vendorRegisterReducer = (state = { }, action) => {
    switch(action.type){
        case USER_VENDOR_REGISTER_REQUEST:
            return {loading: true}
        
        case USER_VENDOR_REGISTER_SUCCESS:
           return {loading: false, success: true}
        
        case USER_VENDOR_REGISTER_FAIL:
           return {loading: false, error: action.payload}

        case USER_VENDOR_REGISTER_RESET:
            return {}

        default:
            return state
    }
}

export const userUpdateReducer = (state={}, action) => {
    switch(action.type){
        case USER_UPDATE_REQUEST:
            return {loading: true}
        
        case USER_UPDATE_SUCCESS:
           return {loading: false, success: true}
        
        case USER_UPDATE_FAIL:
           return {loading: false, error: action.payload}

        case USER_UPDATE_RESET:
            return {}

        default:
            return state
    }
}

export const parentUpdateReducer = (state={}, action) => {
    switch(action.type){
        case USER_PARENT_UPDATE_REQUEST:
            return {loading: true}
        
        case USER_PARENT_UPDATE_SUCCESS:
            return {loading: false, success:true}
        
        case USER_PARENT_UPDATE_FAIL: 
            return {loading: false, error: action.payload}
        
        case USER_PARENT_UPDATE_RESET:
            return {}
        
        default:
            return state
    }
}

export const vendorUpdateReducer = (state={}, action) => {
    switch(action.type){
        case USER_TEACHER_UPDATE_REQUEST:
            return {loading: true}
        
        case USER_TEACHER_UPDATE_SUCCESS:
           return {loading: false, success: true}
        
        case USER_TEACHER_UPDATE_FAIL:
           return {loading: false, error: action.payload}

        case USER_TEACHER_UPDATE_RESET:
            return {}

        default:
            return state
    }
}

export const customerUpdateReducer = (state={}, action) => {
    switch(action.type){
        case USER_CUSTOMER_UPDATE_REQUEST:
            return {loading: true}
        
        case USER_CUSTOMER_UPDATE_SUCCESS:
           return {loading: false, success: true}
        
        case USER_CUSTOMER_UPDATE_FAIL:
           return {loading: false, error: action.payload}

        case USER_CUSTOMER_UPDATE_RESET:
            return {}

        default:
            return state
    }
}

export const teacherTotalReducer = (state={}, action) => {
    switch(action.type){
        case TEACHER_TOTAL_REQUEST:
            return {loading: true}
        
        case TEACHER_TOTAL_SUCCESS:
           return {loading: false, data: action.payload, success: true}
        
        case TEACHER_TOTAL_FAIL:
           return {loading: false, error: action.payload, success: false}

        case TEACHER_TOTAL_RESET:
            return {}

        default:
            return state
    }
}

export const getChildrenGenderReducer = (state={}, action) => {
    switch(action.type){
        case CHILDREN_DEMOGRAPHIC_GENDER_REQUEST:
            return {loading: true}
        
        case CHILDREN_DEMOGRAPHIC_GENDER_SUCCESS:
           return {loading: false, success: true, data: action.payload}
        
        case CHILDREN_DEMOGRAPHIC_GENDER_FAIL:
           return {loading: false, success: false, error: action.payload}

        case CHILDREN_DEMOGRAPHIC_GENDER_RESET:
            return {}

        default:
            return state
    }
}

export const deleteChildrenReducer = (state={}, action) => {
    switch(action.type){
        case CHILDREN_DELETE_REQUEST:
            return {loading: true}
        
        case CHILDREN_DELETE_SUCCESS:
           return {loading: false, success: true}
        
        case CHILDREN_DELETE_FAIL:
           return {loading: false, success: false}

        case CHILDREN_DELETE_RESET:
            return {}

        default:
            return state
    }
}

export const getChildrenDetailsByParentReducer = (state={}, action) => {
    switch(action.type){
        case CHILDREN_DETAILS_REQUEST:
            return {loading: true}
        
        case CHILDREN_DETAILS_SUCCESS:
           return {loading: false, success: true, data: action.payload}
        
        case CHILDREN_DETAILS_FAIL:
           return {loading: false, success: false, error: action.payload}

        case CHILDREN_DETAILS_RESET:
            return {}

        default:
            return state
    }
}

export const addTeacherReducer = (state={}, action) => {
    switch(action.type){
        case NEW_TEACHER_REQUEST:
            return {loading: true}
        
        case NEW_TEACHER_SUCCESS:
           return {loading: false, success: true, data: action.payload}
        
        case NEW_TEACHER_FAIL:
           return {loading: false, success: false, error: action.payload}

        case NEW_TEACHER_RESET:
            return {}

        default:
            return state
    }
}

export const individualTeacherReducer = (state={}, action) => {
    switch(action.type){
        case INDIVIDUAL_TEACHER_REQUEST:
            return {loading: true}
        
        case INDIVIDUAL_TEACHER_SUCCESS:
           return {loading: false, success: true, data: action.payload}
        
        case INDIVIDUAL_TEACHER_FAIL:
           return {loading: false, success: false, error: action.payload}

        case INDIVIDUAL_TEACHER_RESET:
            return {}

        default:
            return state
    }
}

export const ParentListReducer = (state={}, action) => {
    switch(action.type){
        case PARENT_REQUEST:
            return {loading: true}
        
        case PARENT_SUCCESS:
           return {loading: false, success: true, data: action.payload}
        
        case PARENT_FAIL:
           return {loading: false, success: false, error: action.payload}

        case PARENT_RESET:
            return {}

        default:
            return state
    }
}

export const addParentReducer = (state={}, action) => {
    switch(action.type){
        case NEW_PARENT_REQUEST:
            return {loading: true}
        
        case NEW_PARENT_SUCCESS:
           return {loading: false, success: true, data: action.payload}
        
        case NEW_PARENT_FAIL:
           return {loading: false, success: false, error: action.payload}

        case NEW_PARENT_RESET:
            return {}

        default:
            return state
    }
}

export const individualChildResultReducer = (state={}, action) => {
    switch(action.type){
        case INDIVIDUAL_RESULT_REQUEST:
            return {loading: true}
        
        case INDIVIDUAL_RESULT_SUCCESS:
           return {loading: false, success: true, data: action.payload}
        
        case INDIVIDUAL_RESULT_FAIL:
           return {loading: false, success: false, error: action.payload}

        case INDIVIDUAL_RESULT_RESET:
            return {}

        default:
            return state
    }
}

export const individualChildReducer = (state={}, action) => {
    switch(action.type){
        case INDIVIDUAL_CHILDREN_REQUEST:
            return {loading: true}
        
        case INDIVIDUAL_CHILDREN_SUCCESS:
           return {loading: false, success: true, data: action.payload}
        
        case INDIVIDUAL_CHILDREN_FAIL:
           return {loading: false, success: false, error: action.payload}

        case INDIVIDUAL_CHILDREN_RESET:
            return {}

        default:
            return state
    }
}

export const individualParentReducer = (state={}, action) => {
    switch(action.type){
        case INDIVIDUAL_PARENT_REQUEST:
            return {loading: true}
        
        case INDIVIDUAL_PARENT_SUCCESS:
           return {loading: false, success: true, parentD: action.payload}
        
        case INDIVIDUAL_PARENT_FAIL:
           return {loading: false, success: false, error: action.payload}

        case INDIVIDUAL_PARENT_RESET:
            return {}

        default:
            return state
    }
}

export const globalRankingReducer = (state={}, action) => {
    switch(action.type){
        case GLOBAL_RANKING_REQUEST:
            return {loading: true}
        
        case GLOBAL_RANKING_SUCCESS:
           return {loading: false, success: true, data: action.payload}
        
        case GLOBAL_RANKING_FAIL:
           return {loading: false, success: false, error: action.payload}

        case GLOBAL_RANKING_RESET:
            return {}

        default:
            return state
    }
}

export const classRankingReducer = (state={}, action) => {
    switch(action.type){
        case CLASS_RANKING_REQUEST:
            return {loading: true}
        
        case CLASS_RANKING_SUCCESS:
           return {loading: false, success: true, data: action.payload}
        
        case CLASS_RANKING_FAIL:
           return {loading: false, success: false, error: action.payload}

        case CLASS_RANKING_RESET:
            return {}

        default:
            return state
    }
}

export const classComparisonReducer = (state={}, action) => {
    switch(action.type){
        case CLASS_COMPARISION_REQUEST:
            return {loading: true}
        
        case CLASS_COMPARISION_SUCCESS:
           return {loading: false, success: true, data: action.payload}
        
        case CLASS_COMPARISION_FAIL:
           return {loading: false, success: false, error: action.payload}

        case CLASS_COMPARISION_RESET:
            return {}

        default:
            return state
    }
}

export const notificationReducer = (state={}, action) => {
    switch(action.type){
        case NOTICATION_REQUEST:
            return {loading: true}
        
        case NOTICATION_SUCCESS:
           return {loading: false, success: true, data: action.payload}
        
        case NOTICATION_FAIL:
           return {loading: false, success: false, error: action.payload}

        case NOTICATION_RESET:
            return {}

        default:
            return state
    }
}

export const addNewChildReducer = (state={}, action) => {
    switch(action.type){
        case CHILDREN_ADD_REQUEST:
            return {loading: true}
        
        case CHILDREN_ADD_SUCCESS:
           return {loading: false, success: true}
        
        case CHILDREN_ADD_FAIL:
           return {loading: false, success: false, error: action.payload}

        case INDIVIDUAL_PARENT_RESET:
            return {}

        default:
            return state
    }
}

export const updateChildReducer = (state={}, action) => {
    switch(action.type){
        case CHILDREN_UPDATE_REQUEST:
            return {loading: true}
        
        case CHILDREN_UPDATE_SUCCESS:
           return {loading: false, success: true}
        
        case CHILDREN_UPDATE_FAIL:
           return {loading: false, success: false, error: action.payload}

        case CHILDREN_UPDATE_RESET:
            return {}

        default:
            return state
    }
}

export const newNotificationReducer = (state={}, action) => {
    switch(action.type){
        case NEW_NOTICATION_REQUEST:
            return {loading: true}
        
        case NEW_NOTICATION_SUCCESS:
           return {loading: false, success: true}
        
        case NEW_NOTICATION_FAIL:
           return {loading: false, success: false, error: action.payload}

        case NEW_NOTICATION_RESET:
            return {}

        default:
            return state
    }
}




