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

    USER_UPDATE_REQUEST, 
    USER_UPDATE_SUCCESS,
    USER_UPDATE_RESET,
    USER_UPDATE_FAIL,

    SCANNER_REQUEST, 
    SCANNER_SUCCESS, 
    SCANNER_FAIL, 
    SCANNER_RESET,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,

    NEW_ATTENDANCE_REQUEST, 
    NEW_ATTENDANCE_SUCCESS, 
    NEW_ATTENDANCE_FAIL

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

        console.log(data.userID);

        if(!data.is_active){
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: "User Is Inactive",
            })
        }

        const { data: data2 } = await axios.get(
            `http://ezkids-backend-dev.ap-southeast-1.elasticbeanstalk.com/api/individualteacher/${data.userID}/`,
            config
          );
          
          if (data2) {
            console.log(data2);
          } else {
            console.log('No data found');
          }
        
        // const { data2 } = await axios.get(
        //     `http://ezkids-backend-dev.ap-southeast-1.elasticbeanstalk.com/api/individualteacher/${data.userID}/`,
        //     config
        // ).then((e) => console.log(e));

        // console.log(data);    
        // console.log(data2);
        

        const data3 = {
            ...data,
            ...data2
        }
        console.log(data3[0]);

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

export const Logout = () => (dispatch) => {
    dispatch({type: LOGOUT_REQUEST})
    AsyncStorage.clear()
    dispatch*{type: ANNOUNCEMENT_RESET}
    dispatch({type: LOGOUT_SUCCESS})
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


//UPDATE TEACHER
//new user register
export const update = (teacherDetails) => async (dispatch) => {
    try{
        dispatch({
            type:USER_UPDATE_REQUEST
        })

        const config = {
            headers: {
                'Content-type' : 'application/json'
            }
        }


        console.log(teacherDetails.teacherID)
        // 1) adding new user 
        const { data } = await axios.put(
            `http://ezkids-backend-dev.ap-southeast-1.elasticbeanstalk.com/api/update/teacher/${teacherDetails.teacherID}/`,
            teacherDetails,
            config
        )

        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

//new attendance
export const newAttendance = (info) => async (dispatch) => {
    try{
        console.log(info)
        console.log("enter new attendance")
        dispatch({
            type:NEW_ATTENDANCE_REQUEST
        })

        const config = {
            headers: {
                'Content-type' : 'application/json'
            }
        }

        console.log(info)
        // 1) adding new user 
        const { data } = await axios.put(
            `http://ezkids-backend-dev.ap-southeast-1.elasticbeanstalk.com/api/attendancelist/attendance/`,
            info,
            config
        )

        dispatch({
            type: NEW_ATTENDANCE_SUCCESS,
            payload: data.detail
        })

    }catch(error){
        dispatch({
            type: NEW_ATTENDANCE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}