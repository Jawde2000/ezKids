import {

    ANNOUNCEMENT_REQUEST,
    ANNOUNCEMENT_FAIL,
    ANNOUNCEMENT_RESET,
    ANNOUNCEMENT_SUCCESS


} from '../constants/announcementConstants'

export const announcementReducer = (state = {}, action) => {
    switch(action.type){
        case ANNOUNCEMENT_REQUEST:
            return {loading: true}
        
        case ANNOUNCEMENT_SUCCESS:
           return {loading: false, data: action.payload, e:false}
        
        case ANNOUNCEMENT_FAIL:
           return {loading: false, error: action.payload, e:true}

        case ANNOUNCEMENT_RESET:
           return {}

        default:
            return state
    }
}