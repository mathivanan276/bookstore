import Axios from 'axios';

export const ADDRESS_LOADING_TRUE = 'ADDRESS_LOADING_TRUE';
export const ADDRESS_LOADING_FALSE = 'ADDRESS_LOADING_FALSE';
export const GET_ADDRESS = 'GET_ADDRESS';


const addressLoadingTrue = () => {
    return{
        type:ADDRESS_LOADING_TRUE
    }
}

const addressLoadingFalse = () => {
    return{
        type:ADDRESS_LOADING_FALSE
    }
}

const saveAddress = (data) => {
    return {
        type:GET_ADDRESS,
        data:data
    }
}

export const getAddress = () => {
    return (dispatch) => {
        dispatch(addressLoadingTrue());
        const token = JSON.parse(localStorage.getItem('userDetails')).token;
        Axios.get('address/read',{
            headers:{'HTTP_AUTHORIZATION' : token}
        })
        .then(res => {
            if(res.data.response === true) {
                dispatch(saveAddress(res.data.data))
                dispatch(addressLoadingFalse());
            }
        })
    }
}