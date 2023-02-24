import {
    GET_CLASS_REQUEST,
    GET_CLASS_SUCCESS, 
    GET_CLASS_FAIL, 
    GET_CLASS_RESET,

    GET_CHILDREN_REQUEST, 
    GET_CHILDREN_SUCCESS,
    GET_CHILDREN_FAIL,
    GET_CHILDREN_RESET,

    CLASS_RANKING_REQUEST, 
    CLASS_RANKING_SUCCESS, 
    CLASS_RANKING_FAIL, 
    CLASS_RANKING_RESET,

    UPDATE_CHILDREN_REQUEST,
    UPDATE_CHILDREN_SUCCESS,
    UPDATE_CHILDREN_FAIL,
    UPDATE_CHILDREN_RESET,

    GET_PARENT_REQUEST,
    GET_PARENT_SUCCESS,
    GET_PARENT_FAIL,
    GET_PARENT_RESET,

    SUBJECT_GRADE_REQUEST,
    SUBJECT_GRADE_SUCCESS,
    SUBJECT_GRADE_FAIL,
    SUBJECT_GRADE_RESET,

    NEW_SUBJECT_GRADE_REQUEST,
    NEW_SUBJECT_GRADE_SUCCESS,
    NEW_SUBJECT_GRADE_FAIL,
    NEW_SUBJECT_GRADE_RESET,

    UPDATE_SUBJECT_GRADE_REQUEST,
    UPDATE_SUBJECT_GRADE_SUCCESS,
    UPDATE_SUBJECT_GRADE_FAIL,
    UPDATE_SUBJECT_GRADE_RESET,

    DELETE_SUBJECT_GRADE_REQUEST,
    DELETE_SUBJECT_GRADE_SUCCESS,
    DELETE_SUBJECT_GRADE_FAIL,
    DELETE_SUBJECT_GRADE_RESET,

    INDIVIDUAL_CHILDREN_REQUEST,
    INDIVIDUAL_CHILDREN_SUCCESS, 
    INDIVIDUAL_CHILDREN_FAIL,
    INDIVIDUAL_CHILDREN_RESET,

} from '../constants/classConstants';

export const individualChildReducer = (state = {}, action) => {
    switch(action.type){
        case INDIVIDUAL_CHILDREN_REQUEST:
            return {loading: true}
        
        case INDIVIDUAL_CHILDREN_SUCCESS:
           return {loading: false, success:true, data: action.payload}
        
        case INDIVIDUAL_CHILDREN_FAIL:
           return {loading: false, success:false, error: action.payload}

        case INDIVIDUAL_CHILDREN_RESET:
           return {}

        default:
            return state
    }
}

export const deleteGradeReducer = (state = {}, action) => {
    switch(action.type){
        case DELETE_SUBJECT_GRADE_REQUEST:
            return {loading: true}
        
        case DELETE_SUBJECT_GRADE_SUCCESS:
           return {loading: false, success:true}
        
        case DELETE_SUBJECT_GRADE_FAIL:
           return {loading: false, success:false}

        case DELETE_SUBJECT_GRADE_RESET:
           return {}

        default:
            return state
    }
}


export const updateGradeReducer = (state = {}, action) => {
    switch(action.type){
        case UPDATE_SUBJECT_GRADE_REQUEST:
            return {loading: true}
        
        case UPDATE_SUBJECT_GRADE_SUCCESS:
           return {loading: false, success:true}
        
        case UPDATE_SUBJECT_GRADE_FAIL:
           return {loading: false, success:false}

        case UPDATE_SUBJECT_GRADE_RESET:
           return {}

        default:
            return state
    }
}

export const newGradeReducer = (state = {}, action) => {
    switch(action.type){
        case NEW_SUBJECT_GRADE_REQUEST:
            return {loading: true}
        
        case NEW_SUBJECT_GRADE_SUCCESS:
            return {loading: false, data: action.payload, success:true}
        
        case NEW_SUBJECT_GRADE_FAIL:
            return {loading: false, data: action.payload, success:true}

        case NEW_SUBJECT_GRADE_RESET:
           return {}

        default:
            return state
    }
}

export const subjectGradeReducer = (state = {}, action) => {
    switch(action.type){
        case SUBJECT_GRADE_REQUEST:
            return {loading: true}
        
        case SUBJECT_GRADE_SUCCESS:
           return {loading: false, data: action.payload, success:true}
        
        case SUBJECT_GRADE_FAIL:
           return {loading: false, error: action.payload, success:false}

        case SUBJECT_GRADE_RESET:
           return {}

        default:
            return state
    }
}

export const parentReducer = (state = {}, action) => {
    switch(action.type){
        case GET_PARENT_REQUEST:
            return {loading: true}
        
        case GET_PARENT_SUCCESS:
           return {loading: false, data: action.payload, success:true}
        
        case GET_PARENT_FAIL:
           return {loading: false, error: action.payload, success:false}

        case GET_PARENT_RESET:
           return {}

        default:
            return state
    }
}


export const updateChildrenReducer = (state = {}, action) => {
    switch(action.type){
        case UPDATE_CHILDREN_REQUEST:
            return {loading: true}
        
        case UPDATE_CHILDREN_SUCCESS:
           return {loading: false, success:true}
        
        case UPDATE_CHILDREN_FAIL:
           return {loading: false, success:false}

        case UPDATE_CHILDREN_RESET:
           return {}

        default:
            return state
    }
}

export const classRankingntReducer = (state = {}, action) => {
    switch(action.type){
        case CLASS_RANKING_REQUEST:
            return {loading: true}
        
        case CLASS_RANKING_SUCCESS:
           return {loading: false, data: action.payload, success:true}
        
        case CLASS_RANKING_FAIL:
           return {loading: false, error: action.payload, success:false}

        case CLASS_RANKING_RESET:
           return {}

        default:
            return state
    }
}

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