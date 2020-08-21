import Axios from 'axios';

export const GET_PERSONAL_INFO = 'GET_PERSONAL_INFO';
export const PERSONAL_INFO_LOADING_TRUE = 'PERSONAL_INFO_LOADING_TRUE';
export const PERSONAL_INFO_LOADING_FALSE = 'PERSONAL_INFO_LOADING_FALSE';


const personalInfoLoadingTrue = () => {
    return{
        type: PERSONAL_INFO_LOADING_TRUE
    }
}
const personalInfoLoadingFalse= () => {
    return{
        type: PERSONAL_INFO_LOADING_FALSE
    }
}

const savePersonalInfo = (data) => {
    return {
        type:GET_PERSONAL_INFO,
        data:data
    }
}

export const getPersonalInfo = () => {
    return (dispatch) => {
        dispatch(personalInfoLoadingTrue());
        if(localStorage.getItem('userDetails')){
        let token = JSON.parse(localStorage.getItem('userDetails')).token
        Axios.get('/personaldetails/read',{headers:{'HTTP_AUTHORIZATION':token}})
        .then( res => {
            // console.log(res)
            if(res.data.response === true){
                dispatch(savePersonalInfo(res.data.data));
                dispatch(personalInfoLoadingFalse());
            } else {
                console.log(res.data.error);
            }
        }) 
        .catch( err => {
            console.log(err)
        })
    }
}
} 