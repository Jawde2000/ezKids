import {
    GET_CLASS_REQUEST,
    GET_CLASS_SUCCESS, 
    GET_CLASS_FAIL, 
    GET_CLASS_RESET,

    GET_CHILDREN_REQUEST,
    GET_CHILDREN_SUCCESS,
    GET_CHILDREN_FAIL, 
    GET_CHILDREN_RESET,

    GET_ATTENDANCE_REQUEST, 
    GET_ATTENDANCE_SUCCESS, 
    GET_ATTENDANCE_FAIL, 
    GET_ATTENDANCE_RESET,

} from '../constants/classConstants';
import axios from 'axios'

//GET STUDENT LIST BY CLASSID
export const classStudentAction = (ClassID) => async (dispatch) => {

    try{
        console.log("inside class chilren list action");
        dispatch({
            type: GET_CHILDREN_REQUEST
        })

        const config = {
            headers: {
                'Content-type' : 'application/json'
            }
        }

        // console.log("hello");
        console.log("this is Class ID " + ClassID)


        const { data } = await axios.get(
            `http://ezkids-backend-dev.ap-southeast-1.elasticbeanstalk.com/api/class/children/${ClassID}/`,
            config
        )
            

        const promises = data.map(child => {
            return axios.get(
                `http://ezkids-backend-dev.ap-southeast-1.elasticbeanstalk.com/api/attendances/${child.childID}/`,
                config
            ).then(response => response.data)
        });
        
        const attendanceData = await Promise.all(promises);
        console.log(96)
        console.log(attendanceData)
        
        const combinedData = data.map((child, index) => {
            return { ...child, attendanceData: attendanceData[index] };
        });
        
        console.log(combinedData);

        dispatch({
            type: GET_CHILDREN_SUCCESS,
            payload: combinedData
        })
       

    }catch(error){
        dispatch({
            type: GET_CHILDREN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }    

}

//GET LIST OF Class
export const classAction = (teacherID) => async (dispatch) => {

    try{
        console.log("inside class action");
        dispatch({
            type: GET_CLASS_REQUEST
        })

        const config = {
            headers: {
                'Content-type' : 'application/json'
            }
        }

        // console.log("hello");
        console.log("this is teacher ID " + teacherID)


        const { data } = await axios.get(
            `http://ezkids-backend-dev.ap-southeast-1.elasticbeanstalk.com/api/class/teacher/${teacherID}/`,
            config
        )
        
        console.log(data);

        dispatch({
            type: GET_CLASS_SUCCESS,
            payload: data
        })
       

    }catch(error){
        dispatch({
            type: GET_CLASS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }    

}