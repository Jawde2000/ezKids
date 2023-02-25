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

    INDIVIDUAL_CHILDREN_REQUEST, 
    INDIVIDUAL_CHILDREN_SUCCESS, 
    INDIVIDUAL_CHILDREN_FAIL, 
    INDIVIDUAL_CHILDREN_RESET,

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

} from '../constants/classConstants';
import axios from 'axios'

//delete GRADE FOR CHILD
export const deleteGradeAction = (gradeID) => async (dispatch) => {
    try{
        console.log("inside delete grade action");
        dispatch({
            type: DELETE_SUBJECT_GRADE_REQUEST
        })

        const config = {
            headers: {
                'Content-type' : 'application/json'
            }
        }

        // console.log("hello");
        console.log(gradeID)


        const { data } = await axios.delete(
            `http://ezkids-backend-dev.ap-southeast-1.elasticbeanstalk.com/api/delete/grade/${gradeID}/`,
            config
        )

        console.log(data);

        dispatch({
            type: DELETE_SUBJECT_GRADE_SUCCESS,
        })


    }catch(error){
        dispatch({
            type: DELETE_SUBJECT_GRADE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updateGradeAction = (childGrade, gradeID) => async (dispatch) => {
    try{
        console.log("inside update grade action");
        dispatch({
            type: UPDATE_SUBJECT_GRADE_REQUEST
        })

        const config = {
            headers: {
                'Content-type' : 'application/json'
            }
        }

        // console.log("hello");
        console.log(gradeID)
        console.log(childGrade)


        const { data } = await axios.put(
            `http://ezkids-backend-dev.ap-southeast-1.elasticbeanstalk.com/api/update/grade/${gradeID}/`,
            childGrade,
            config
        )

        console.log(data);

        dispatch({
            type: UPDATE_SUBJECT_GRADE_SUCCESS,
        })


    }catch(error){
        dispatch({
            type: UPDATE_SUBJECT_GRADE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

//ADD NEW GRADE FOR CHILD
export const newGradeAction = (childGrade) => async (dispatch) => {
    try{
        console.log("inside new grade action");
        dispatch({
            type: NEW_SUBJECT_GRADE_REQUEST
        })

        const config = {
            headers: {
                'Content-type' : 'application/json'
            }
        }

        // console.log("hello");
        console.log(childGrade)


        const { data } = await axios.put(
            `http://ezkids-backend-dev.ap-southeast-1.elasticbeanstalk.com/api/new/grade/`,
            childGrade,
            config
        )
        
        console.log(data);

        dispatch({
            type: NEW_SUBJECT_GRADE_SUCCESS,
        })
       

    }catch(error){
        dispatch({
            type: NEW_SUBJECT_GRADE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }    
}

//GET INDIVIDUAL CHILD OF Class
export const individualChildAction = (childID) => async (dispatch) => {
    try{
        console.log("inside  individual child action");
        dispatch({
            type: INDIVIDUAL_CHILDREN_REQUEST
        })

        const config = {
            headers: {
                'Content-type' : 'application/json'
            }
        }

        // console.log("hello");
        console.log("this is child ID " + childID)


        const { data } = await axios.get(
            `http://ezkids-backend-dev.ap-southeast-1.elasticbeanstalk.com/api/individualChildren/${childID}/`,
            config
        )
        
        console.log(data);

        dispatch({
            type: INDIVIDUAL_CHILDREN_SUCCESS,
            payload: data
        })
       

    }catch(error){
        dispatch({
            type: INDIVIDUAL_CHILDREN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }    
}

export const updateChildrenAction = (children, childID) => async (dispatch) => {
    try{
        console.log("inside  update children action");
        dispatch({
            type: UPDATE_CHILDREN_REQUEST
        })

        const config = {
            headers: {
                'Content-type' : 'application/json'
            }
        }

        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        console.log("this is Children ID " + childID)
        console.log(children)


        await axios.put(
            `http://ezkids-backend-dev.ap-southeast-1.elasticbeanstalk.com/api/update/children/${childID}/`,
            children,
            config
        )
        
        dispatch({
            type: UPDATE_CHILDREN_SUCCESS,
        })
       

    }catch(error){
        dispatch({
            type: UPDATE_CHILDREN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }    
}

//GET INDIVIDUAL RANKING OF Class
export const childrenGradeAction = (gradeID) => async (dispatch) => {
    try{
        console.log("inside  grade action");
        dispatch({
            type: SUBJECT_GRADE_REQUEST
        })

        const config = {
            headers: {
                'Content-type' : 'application/json'
            }
        }

        // console.log("hello");
        console.log("this is grade ID " + gradeID)


        const { data } = await axios.get(
            `http://ezkids-backend-dev.ap-southeast-1.elasticbeanstalk.com/api/grade/children/${gradeID}/`,
            config
        )
        
        console.log(data);

        dispatch({
            type: SUBJECT_GRADE_SUCCESS,
            payload: data
        })
       

    }catch(error){
        dispatch({
            type: SUBJECT_GRADE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }    
}

//GET RANKING LIST OF Class
export const classRankingAction = (classID) => async (dispatch) => {

    try{
        console.log("inside class rankingaction");
        dispatch({
            type: CLASS_RANKING_REQUEST
        })

        const config = {
            headers: {
                'Content-type' : 'application/json'
            }
        }

        // console.log("hello");
        console.log("this is class ID " + classID)


        const { data } = await axios.get(
            `http://ezkids-backend-dev.ap-southeast-1.elasticbeanstalk.com/api/class/ranking/${classID}/`,
            config
        )
        
        console.log(data);

        dispatch({
            type: CLASS_RANKING_SUCCESS,
            payload: data
        })
       

    }catch(error){
        dispatch({
            type: CLASS_RANKING_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }    

}

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