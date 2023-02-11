import axios from 'axios'
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

    USER_CUSTOMER_REGISTER_REQUEST, 
    USER_CUSTOMER_REGISTER_SUCCESS,
    USER_CUSTOMER_REGISTER_FAIL,
    USER_CUSTOMER_REGISITER_RESET,
    
    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    
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

    USER_PARENT_UPDATE_REQUEST, 
    USER_PARENT_UPDATE_SUCCESS,
    USER_PARENT_UPDATE_FAIL,
    USER_PARENT_UPDATE_RESET,
    
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

import { HELP_LIST_RESET } from '../constants/helpConstants'

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

        const { data } = await axios.post(
            'http://127.0.0.1:8000/api/users/login/',
            {
                "email": email,
                "password": password
            },
            config
        )

        console.log(data)
        
        if(!data.is_superuser){
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: "Invalid User"
            })
        }
        else{
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            })
            
            //set user info in local storage
            localStorage.setItem('userInfo', JSON.stringify(data))
        }
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
    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
    dispatch({type: USER_LIST_RESET})
    dispatch({type: USER_DETAIL_RESET})
    dispatch({type: HELP_LIST_RESET})
}

//get teacher total
export const user_Total = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: TEACHER_TOTAL_REQUEST
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // var { data } = await axios.get(
        //     'http://127.0.0.1:8000/api/users/',
        //     config
        // )

        // console.log(data)

        let teacherInfo = await axios.get(
            `http://127.0.0.1:8000/api/user/teacher/`,
            config
        );

        let parentInfo = await axios.get(
            `http://127.0.0.1:8000/api/user/parent/`,
            config
        );

        let childrenInfo = await axios.get(
            `http://127.0.0.1:8000/api/user/children/`,
            config
        );

        let classInfo = await axios.get(
            `http://127.0.0.1:8000/api/user/classes/`,
            config
        );

        var data = [teacherInfo.data, parentInfo.data, childrenInfo.data, classInfo.data]

        console.log(data)

        dispatch({
            type: TEACHER_TOTAL_SUCCESS,
            payload: data
        })
    } catch(error) {
        dispatch({
            type: TEACHER_TOTAL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



//GET TEACHER LISTS
export const listTeachers = () => async (dispatch, getState) => {
    try{
        dispatch({
            type:USER_LIST_REQUEST
        })

        const {
            userLogin: {userInfo},
        } = getState()


        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        var { data } = await axios.get(
            'http://127.0.0.1:8000/api/users/',
            config
        )

        console.log(data)

        var listTeacher = await axios.get(
            'http://127.0.0.1:8000/api/teachers/',
            config
        )
        
        dispatch({
            type: USER_LIST_SUCCESS,
            payload: listTeacher.data
        })

    }catch(error){
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

//GET TEACHER LISTS
export const ListParents = () => async (dispatch, getState) => {
    try{
        dispatch({
            type:PARENT_REQUEST
        })

        const {
            userLogin: {userInfo},
        } = getState()


        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        var { data } = await axios.get(
            'http://127.0.0.1:8000/api/users/',
            config
        )

        console.log(data)

        var listParents = await axios.get(
            'http://127.0.0.1:8000/api/parents/',
            config
        )

        console.log(listParents)
        
        dispatch({
            type: PARENT_SUCCESS,
            payload: listParents.data
        })

    }catch(error){
        dispatch({
            type: PARENT_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

//GET ONLY ONE USER 
export const getUser = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type:USER_DETAIL_REQUEST
        })

        const {
            userLogin: {userInfo},
        } = getState()


        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        var { data } = await axios.get(
            `http://127.0.0.1:8000/api/user/${id}/`,
            config
        )

        const config2 = {
            headers:{
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        // if(data.is_customer){
        //     data = {
        //         ...data,
        //         customerInfo: await axios.get(
        //             `http://127.0.0.1:8000/api/user/customer/${id}/`,
        //             config2
        //         )
        //     }
        // }
        // else if(data.is_vendor){
        //     data = {
        //         ...data,
        //         vendorInfo: await axios.get(
        //             `http://127.0.0.1:8000/api/user/vendor/${id}/`,
        //             config2
        //         )
        //     }
        // }
        
        

        dispatch({
            type: USER_DETAIL_SUCCESS,
            payload: data
        })


    }catch(error){
        dispatch({
            type: USER_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


//GET USER delete
export const deleteChilds = (id) => async (dispatch, getState) => {
    try{
        
        dispatch({
            type:CHILDREN_DELETE_REQUEST
        })

        const {
            userLogin: {userInfo},
        } = getState()


        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `http://127.0.0.1:8000/api/delete/children/${id}/`,
            config
        )
        
        dispatch({
            type: CHILDREN_DELETE_SUCCESS,
        })

    }catch(error){
        dispatch({
            type: CHILDREN_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

//GET USER delete
export const deleteUsers = (id) => async (dispatch, getState) => {
    try{
        
        dispatch({
            type:USER_DELETE_REQUEST
        })

        const {
            userLogin: {userInfo},
        } = getState()


        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `http://127.0.0.1:8000/api/user/delete/${id}/`,
            config
        )
        
        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const teacherRegister = (teacher) => async (dispatch, getState) => {
    try{
        
        dispatch({
            type:NEW_TEACHER_REQUEST
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `http://127.0.0.1:8000/api/users/register/`,
            teacher,
            config
        )

        dispatch({
            type: NEW_TEACHER_SUCCESS,
        })

    }catch(error){
        dispatch({
            type: NEW_TEACHER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const newNotificationPost = (notification) => async (dispatch, getState) => {
    try{
        console.log("new notification")
        dispatch({
            type:NEW_NOTICATION_REQUEST
        })

        const {
            userLogin: {userInfo},
        } = getState()


        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        notification = {
            ...notification,
        }

        const {data2} = await axios.put(
            `http://127.0.0.1:8000/api/new/announcement/`,
            notification,
            config
        )

        dispatch({
            type: NEW_NOTICATION_SUCCESS,
        })

        dispatch({
            type: NEW_NOTICATION_SUCCESS,
        })

        dispatch({
            type: NOTICATION_REQUEST
        })
    }catch(error){
        dispatch({
            type: NEW_NOTICATION_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const parentRegister = (user, parent) => async (dispatch, getState) => {
    try{
        
        //create a new user first
        console.log(user)
        console.log(parent)
        dispatch({
            type:NEW_PARENT_REQUEST
        })

        const {
            userLogin: {userInfo},
        } = getState()


        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `http://127.0.0.1:8000/api/users/register/`,
            user,
            config
        )
        
        console.log(data)

        parent = {
            ...parent,
            created_by: data.userID,
        }

        console.log(parent)

        console.log("testing3")

        const {data2} = await axios.put(
            `http://127.0.0.1:8000/api/new/parents/`,
            parent,
            config
        )

        console.log("testing2")

        dispatch({
            type: NEW_PARENT_SUCCESS,
        })

    }catch(error){
        dispatch({
            type: NEW_PARENT_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const customerRegisterUsers = (user, customer) => async (dispatch) => {
    try{
        
        dispatch({
            type:USER_CUSTOMER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-type' : 'application/json',
            }
        }

        const { data } = await axios.post(
            `http://127.0.0.1:8000/api/users/register/`,
            user,
            config
        )
        
        customer = {
            ...customer,
            created_by: data.userID
        }
        const { data2 } = await axios.post(
            "http://127.0.0.1:8000/api/customer/",
            customer,
            config
        )

        dispatch({
            type: USER_CUSTOMER_REGISTER_SUCCESS,
        })

    }catch(error){
        dispatch({
            type: USER_CUSTOMER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const adminRegisterUsers = (user) => async (dispatch) => {
    try{
        
        dispatch({
            type:USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-type' : 'application/json',
            }
        }

        const { data } = await axios.post(
            `http://127.0.0.1:8000/api/users/register/`,
            user,
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
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


export const vendorRegisterUsers = (user, vendor, userInfo) => async (dispatch) => {
    try{
        dispatch({
            type:USER_VENDOR_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        console.log(user);

        const { data } = await axios.post(
            `http://127.0.0.1:8000/api/users/register/`,
            user,
            config
        )

        console.log(data)

        vendor = {
            ...vendor,
            created_by: data.userID
        }
        
        console.log(vendor)
        const { data2 } = await axios.post(
            "http://127.0.0.1:8000/api/vendor/",
            vendor,
            config
        )

        dispatch({
            type: USER_VENDOR_REGISTER_SUCCESS,
        })

    }catch(error){
        dispatch({
            type: USER_VENDOR_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


//user update
export const updateUser = (user, id) => async (dispatch, getState) => {
    try{
        dispatch({
            type:USER_UPDATE_REQUEST
        })

        const {
            userLogin: {userInfo},
        } = getState()

        console.log(userInfo.token)

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        var { data } = await axios.put(
            `http://127.0.0.1:8000/api/user/update/${id}/`,
            user,
            config
        )

        dispatch({
            type: USER_UPDATE_SUCCESS,
        })

        if(id == userInfo.userID){
            data = {
                ...userInfo,
                username: user.username,
                email: user.email,
            }

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data,
            })
        }

    }catch(error){
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

//parent update
export const updateParent = (user, parent, id) => async (dispatch, getState) => {
    try{
        dispatch({
            type:USER_PARENT_UPDATE_REQUEST
        })

        const {
            userLogin: {userInfo},
        } = getState()


        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        var { data } = await axios.put(
            `http://127.0.0.1:8000/api/user/update/${id}/`,
            user,
            config
        )

        id = parent['parentsID']
        var { data2 } = await axios.put(
            `http://127.0.0.1:8000/api/update/parents/${id}/`,
            parent,
            config
        )
        
    
        dispatch({
            type: USER_PARENT_UPDATE_SUCCESS,
        })

        dispatch({
            type: TEACHER_TOTAL_REQUEST,
        })
    }catch(error){
        dispatch({
            type: USER_PARENT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

//TEACHER update
export const updateTeacher = (user, teacher, id) => async (dispatch, getState) => {
    try{
        dispatch({
            type:USER_TEACHER_UPDATE_REQUEST
        })

        const {
            userLogin: {userInfo},
        } = getState()

        console.log(userInfo.token)

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        var { data } = await axios.put(
            `http://127.0.0.1:8000/api/user/update/${id}/`,
            user,
            config
        )

        console.log(teacher);
        var { data2 } = await axios.put(
            `http://127.0.0.1:8000/api/user/teacher/update/${id}/`,
            teacher,
            config
        )
        
    
        dispatch({
            type: USER_TEACHER_UPDATE_SUCCESS,
        })


    }catch(error){
        dispatch({
            type: USER_TEACHER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

//TEACHER update
export const updateChildren = (child, id) => async (dispatch, getState) => {
    try{
        dispatch({
            type:CHILDREN_UPDATE_REQUEST
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        var { data } = await axios.put(
            `http://127.0.0.1:8000/api/update/children/${id}/`,
            child,
            config
        )
    
        dispatch({
            type: CHILDREN_UPDATE_SUCCESS,
        })


    }catch(error){
        dispatch({
            type: CHILDREN_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const ChildrenGender = () => async (dispatch, getState) => {
    try{
        dispatch({
            type:CHILDREN_DEMOGRAPHIC_GENDER_REQUEST
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        var { data } = await axios.get(
            `http://127.0.0.1:8000/api/childrengenderdemo/`,
            config
        )

        var demo = [data.male, data.female]

    
        dispatch({
            type: CHILDREN_DEMOGRAPHIC_GENDER_SUCCESS,
            payload: demo
        })


    }catch(error){
        dispatch({
            type: CHILDREN_DEMOGRAPHIC_GENDER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getIndividualTeacher = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type:INDIVIDUAL_TEACHER_REQUEST
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        var { data } = await axios.get(
            `http://127.0.0.1:8000/api/individualteacher/${id}/`,
            config
        )

        console.log(data)
    
        dispatch({
            type: INDIVIDUAL_TEACHER_SUCCESS,
            payload: data[0]
        })


    }catch(error){
        dispatch({
            type: INDIVIDUAL_TEACHER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getIndividualChild = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type:INDIVIDUAL_CHILDREN_REQUEST
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        var { data } = await axios.get(
            `http://127.0.0.1:8000/api/individualChildren/${id}/`,
            config
        )

        console.log(data)
    
        dispatch({
            type: INDIVIDUAL_CHILDREN_SUCCESS,
            payload: data[0]
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

export const getIndividualChildResult = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type:INDIVIDUAL_RESULT_REQUEST
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        var { data } = await axios.get(
            `http://127.0.0.1:8000/api/grade/children/${id}/`,
            config
        )

        console.log(data)
    
        dispatch({
            type: INDIVIDUAL_RESULT_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: INDIVIDUAL_RESULT_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getIndividualParent = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type:INDIVIDUAL_PARENT_REQUEST
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        console.log(id)

        var data;

        if (id.startsWith("U")) {
            console.log("U")
            data  = await axios.get(
                `http://127.0.0.1:8000/api/individualParent/${id}/`,
                config
            )

            data = data.data;
        } else if (id.startsWith("P")) {
            console.log("P")
            data  = await axios.get(
                `http://127.0.0.1:8000/api/individualParentID/${id}/`,
                config
            )
        }
    
        dispatch({
            type: INDIVIDUAL_PARENT_SUCCESS,
            payload: data
        })


    }catch(error){
        dispatch({
            type: INDIVIDUAL_PARENT_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getGlobalRanking = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: GLOBAL_RANKING_REQUEST
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        var { data } = await axios.get(
            `http://127.0.0.1:8000/api/global/ranking/`,
            config
        )

        dispatch({
            type: GLOBAL_RANKING_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: GLOBAL_RANKING_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getClassComparison = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: CLASS_COMPARISION_REQUEST
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        var { data } = await axios.get(
            `http://127.0.0.1:8000/api/classaverage/ranking/`,
            config
        )

        dispatch({
            type: CLASS_COMPARISION_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: CLASS_COMPARISION_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getNotification = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: NOTICATION_REQUEST
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        var { data } = await axios.get(
            `http://127.0.0.1:8000/api/announcement/`,
            config
        )

        dispatch({
            type: NOTICATION_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: NOTICATION_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getChildrenDetailsByParent = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type:CHILDREN_DETAILS_REQUEST
        })

        console.log(id);

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        var { data } = await axios.get(
            `http://127.0.0.1:8000/api/parent/children/${id}/`,
            config
        )

        console.log(data)

        dispatch({
            type: CHILDREN_DETAILS_SUCCESS,
            payload: data
        })


    }catch(error){
        dispatch({
            type: CHILDREN_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createNewChild = (child) => async (dispatch) => {
    try{
        
        dispatch({
            type:CHILDREN_ADD_REQUEST
        })

        const config = {
            headers: {
                'Content-type' : 'application/json',
            }
        }

        const { data } = await axios.put(
            `http://127.0.0.1:8000/api/new/children/`,
            child,
            config
        )

        dispatch({
            type: CHILDREN_ADD_SUCCESS,
        })

    }catch(error){
        dispatch({
            type: CHILDREN_ADD_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}