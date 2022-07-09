import {USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGIN_FAIL,CLEAR_ERRORS,
    USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS,USER_REGISTER_FAIL,
    LOAD_USER_REQUEST,LOAD_USER_SUCCESS,LOAD_USER_FAIL

} from '../Constants/UserConstant'

import axios from 'axios'
export const login = (email,password)  => 
async(dispatch) =>{
try {
    dispatch({
        type : USER_LOGIN_REQUEST,
    })
const config = {
    headers :{
        "Content-Type" : "application/json"
    }
}
    const {data} = await axios.post(
        'http://localhost:5000/api/v1//login',
        {email,password},
        config, //in post req we use config
    )
        dispatch({
            type : USER_LOGIN_SUCCESS,
            payload : data.user,
        })
} catch (error) {
    dispatch({
        type :  USER_LOGIN_FAIL,
        payload : error.response.data.message,
    })
}
}

// login load user
export const loadUser = ()  => 
async(dispatch) =>{
try {
    dispatch({
        type : LOAD_USER_REQUEST,
    })
    const {data} = await axios.get(
        'http://localhost:5000/api/v1/me',
    )
        dispatch({
            type : LOAD_USER_SUCCESS,
            payload : data.user,
        })
} catch (error) {
    dispatch({
        type :  LOAD_USER_FAIL,
        payload : error.response.data.message,
    })
}
}

// userData = myFrom
export const register = (userData)  => 
async(dispatch) =>{
try {
    dispatch({
        type : USER_REGISTER_REQUEST,
    })
const config = {
    headers :{
        // "Content-Type" : "multipart/form-data"
        "Content-Type" : "application/json"
    }
}
    const {data} = await axios.post(
        'http://localhost:5000/api/v1/register',
        userData,
        config, //in post req we use config
    )
        dispatch({
            type : USER_REGISTER_SUCCESS,
            payload : data.user,
        })
} catch (error) {
    dispatch({
        type :  USER_REGISTER_FAIL,
        payload : error.response.data.message,
    })
}
}








// for the purpose of Null error
export const clrAllErrs = () => async (dispatch) =>{
    dispatch({
        type : CLEAR_ERRORS,
    });
} 
