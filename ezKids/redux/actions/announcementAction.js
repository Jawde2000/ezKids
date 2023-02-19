import {

    ANNOUNCEMENT_REQUEST,
    ANNOUNCEMENT_FAIL,
    ANNOUNCEMENT_RESET,
    ANNOUNCEMENT_SUCCESS


} from '../constants/announcementConstants'
import axios from 'axios'


//GET LIST OF ANNOUNCEMENT
export const announcementAction = () => async (dispatch) => {

    try{
        // console.log("inside action");
        dispatch({
            type: ANNOUNCEMENT_REQUEST
        })

        const config = {
            headers: {
                'Content-type' : 'application/json'
            }
        }

        // console.log("hello");


        const { data } = await axios.get(
            `http://ezkids-backend-dev.ap-southeast-1.elasticbeanstalk.com/api/announcement/`,
            config
        )
        console.log(data);

        dispatch({
            type: ANNOUNCEMENT_SUCCESS,
            payload: data
        })

       

    }catch(error){
        dispatch({
            type: ANNOUNCEMENT_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }    

}