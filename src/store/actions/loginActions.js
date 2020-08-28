import Axios from "axios";

export const USER_LOGIN = 'USER_LOGIN';
export const LOGIN_LOADING_TRUE = 'LOGIN_LOADING_TRUE';
export const LOGIN_LOADING_FALSE = 'LOGIN_LOADING_FALSE';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';
export const LOGGED_IN_VERIFY = 'LOGGED_IN_VERIFY';

const saveUserDetails = (data,time) => {
    return{
        type: USER_LOGIN,
        data,
        time
    }
}

const loginLoadingTrue = () => {
    return{
        type:LOGIN_LOADING_TRUE
    }
}
const loginLoadingFalse = () => {
    return{
        type:LOGIN_LOADING_FALSE
    }
}

const loginError = (error) => {
    return{
        type:LOGIN_ERROR,
        error
    }
}

export const logout = () => {
    return (dispatch) => {
        localStorage.removeItem('userDetails');
        localStorage.removeItem('expireDate');
        dispatch({
            type:LOGOUT
        })
    }
}

export const userlogin = (email,password) =>{
    return (dispatch) => {
        dispatch(loginLoadingTrue());
        Axios.post('/users/login',{
            email,
            password
        })
        .then(res => {
            // console.log(res.data);
            if(res.data.response === true){
                dispatch(saveUserDetails(res.data.data,new Date(new Date().getTime()+res.data.data.expiresIn*1000)));
                dispatch(loginLoadingFalse());
            } else {
                dispatch(loginError(res.data.error));
                dispatch(loginLoadingFalse());
            }
        })
        .catch (err => {
            console.log(err);
        })
    }
}

export const adminlogin = (email,password) =>{
    return (dispatch) => {
        dispatch(loginLoadingTrue());
        Axios.post('/users/adminlogin',{
            email,
            password
        })
        .then(res => {
            // console.log(res.data);
            if(res.data.response === true){
                dispatch(saveUserDetails(res.data.data,new Date(new Date().getTime()+res.data.data.expiresIn*1000)));
                dispatch(loginLoadingFalse());
            } else {
                dispatch(loginError(res.data.error));
                dispatch(loginLoadingFalse());
            }
        })
        .catch (err => {
            console.log(err);
        })
    }
}

const loginVerified = (data) => {
    return {
        type:LOGGED_IN_VERIFY,
        data
    }
}

export const checkLoggedIn = () => {
    return (dispatch) => {
        if(localStorage.getItem('userDetails')){
        dispatch(loginLoadingTrue());
        let userDetails = JSON.parse(localStorage.getItem('userDetails'));
            let isValid = new Date(localStorage.getItem('expireDate')) > new Date();
            if(isValid === true){
                // console.log(userDetails);
                dispatch(loginVerified(userDetails));
                dispatch(loginLoadingFalse());
            } else {
                dispatch(logout());
            }
          }
    }
}