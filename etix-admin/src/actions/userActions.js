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

    USER_VENDOR_UPDATE_REQUEST, 
    USER_VENDOR_UPDATE_SUCCESS,
    USER_VENDOR_UPDATE_FAIL,
    USER_VENDOR_UPDATE_RESET,

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

//GET USER LISTS
export const listUsers = () => async (dispatch, getState) => {
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

        console.log(listTeacher)

        // let teacherInfo = [];

        // for(let i of data) {
        //     if (i.is_teacher) {
        //         let rst = await axios.get(
        //             `http://127.0.0.1:8000/api/teachers/${i.userID}`,
        //             config
        //         );
        //         console.log(rst)
        //         teacherInfo.push(rst.data)

        //     }
        // }

        // console.log(teacherInfo)
        // let teacherInfo = [];

        // console.log(data);

        // for(let i of data){
        //     if(i.is_vendor){
        //         let rst = await axios.get(
        //             `http://127.0.0.1:8000/api/user/vendor/${i.userID}/`,
        //             config
        //         );

        //         rst.data.email = i.email;
        //         rst.data.userID = i.userID;
        //         rst.data.username = i.username;
        //         teacherInfo.push(rst.data);
        //     }
        // }

        // let i=0;

        // if(teacherInfo.length != 0){
        //     data = data.map((item, index) => {
        //         if(item.is_vendor){
        //             let vendorIf = teacherInfo[i];
                    
        //             console.log(vendorIf)
                    
        //             i++;

        //             return ({
        //                 ...item,
        //                 teacherInfo: vendorIf,
        //             })
        //         }
        //         else{
        //             return ({
        //                 ...item,
        //             })
        //         }
        //     })
        // }

        // console.log(teacherInfo);
        
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
        if(data.is_customer){
            data = {
                ...data,
                customerInfo: await axios.get(
                    `http://127.0.0.1:8000/api/user/customer/${id}/`,
                    config2
                )
            }
        }
        else if(data.is_vendor){
            data = {
                ...data,
                vendorInfo: await axios.get(
                    `http://127.0.0.1:8000/api/user/vendor/${id}/`,
                    config2
                )
            }
        }
        
        

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

//customer update
export const updateCustomer = (user, customer, id) => async (dispatch, getState) => {
    try{
        dispatch({
            type:USER_CUSTOMER_UPDATE_REQUEST
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

        console.log(user);
        console.log(customer);

        var { data } = await axios.put(
            `http://127.0.0.1:8000/api/user/update/${id}/`,
            user,
            config
        )

        var { data2 } = await axios.put(
            `http://127.0.0.1:8000/api/user/customer/update/${id}/`,
            customer,
            config
        )
        
    
        dispatch({
            type: USER_CUSTOMER_UPDATE_SUCCESS,
        })


    }catch(error){
        dispatch({
            type: USER_CUSTOMER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

//VENDOR update
export const updateTeacher = (user, teacher, id) => async (dispatch, getState) => {
    try{
        dispatch({
            type:USER_VENDOR_UPDATE_REQUEST
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
            type: USER_VENDOR_UPDATE_SUCCESS,
        })


    }catch(error){
        dispatch({
            type: USER_VENDOR_UPDATE_FAIL,
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