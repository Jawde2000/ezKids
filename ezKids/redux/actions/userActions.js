import axios from 'axios'
import {
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,


    USER_FORGET_REQUEST, 
    USER_FORGET_SUCCESS,
    USER_FORGET_RESET,
    USER_FORGET_FAIL,

    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS,
    USER_REGISTER_RESET,
    USER_REGISTER_FAIL,

} from '../constants/userConstants'

import { ANNOUNCEMENT_RESET } from '../constants/announcementConstants';
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

        if(!data.is_active){
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: "User Is Inactive",
            })
        }
        
        const { data2 } = await axios.get(
            `http://ezkids-backend-dev.ap-southeast-1.elasticbeanstalk.com/api/individualteacher/${data.userID}/`,
            config
        )

        console.log(data);    
        console.log(data2);

        const data3 = {
            ...data,
            ...data2
        }

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data3
            })
        

       
        
        //set user info in local storage
        AsyncStorage.setItem('userInfo', JSON.stringify(data3));

       

       


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
    console.log("hello");
    AsyncStorage.clear()
    dispatch({type: USER_LOGOUT})
    dispatch({type: ANNOUNCEMENT_RESET})
    // dispatch({type: USER_LIST_RESET})
    // dispatch({type: USER_DETAIL_RESET})
    // dispatch({type: HELP_LIST_RESET})
}

//Forgot password
export const forgot = (email) => async (dispatch) => {

    try{
        dispatch({
            type:USER_FORGET_REQUEST
        })

        const config = {
            headers: {
                'Content-type' : 'application/json'
            }
        }

        console.log(data);
        const { data } = await axios.get(
            `http://ezkids-backend-dev.ap-southeast-1.elasticbeanstalk.com/api/user/resetpass/${email}/`,
            config
        )

        dispatch({
            type: USER_FORGET_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: USER_FORGET_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }    

}


//new user register
export const register = (userData, parentData) => async (dispatch) => {
    try{
        dispatch({
            type:USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-type' : 'application/json'
            }
        }


        // 1) adding new user 
        const { data } = await axios.post(
            'http://ezkids-backend-dev.ap-southeast-1.elasticbeanstalk.com/api/users/register/',
            userData,
            config
        )
        console.log(data);

        parentData = {
            ...parentData,
            'created_by' : data.userID
        }

        // 2) adding new parent
        const { data2 } = await axios.put(
            'http://ezkids-backend-dev.ap-southeast-1.elasticbeanstalk.com/api/new/parents/',
            parentData,
            config
        )

        console.log(data2);


        const data3 = {
            ...data,
            ...data2,
        }
        // data = {
        //     ...data,
        //     ...data2
        // }

        console.log(data3);

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}