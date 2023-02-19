import axios from 'axios'
import {
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
} from '../constants/userConstants'
import { AsyncStorage } from 'react-native';

export const login = (email, password) => async (dispatch) => {
    try{
        dispatch({
            type:USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type' : 'application/json'
            }
        }

        console.log("hello");

        const { data } = await axios.post(
            'http://ezkids-backend-dev.ap-southeast-1.elasticbeanstalk.com/api/users/login/',
            {
                "email": email,
                "password": password
            },
            config
        )

        console.log("hello");


        // console.log(data)
        
        // if(!data.is_teacher || !data.is_parent){
        //     dispatch({
        //         type: USER_LOGIN_FAIL,
        //         payload: "Invalid User / Super admin need to goes to another portal"
        //     })
        // }

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        
        //set user info in local storage
        AsyncStorage.setItem('userInfo', JSON.stringify(data));

       

        // if(data.is_parent){
            
        // }


    }catch(error){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
    AsyncStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
    // dispatch({type: USER_LIST_RESET})
    // dispatch({type: USER_DETAIL_RESET})
    // dispatch({type: HELP_LIST_RESET})
}