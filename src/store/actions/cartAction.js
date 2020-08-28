import Axios from 'axios';

export const CART_LOADING_TRUE = 'CART_LOADING_TRUE';
export const CART_LOADING_FALSE = 'CART_LOADING_FALSE';
export const GET_CART = 'GET_CART';

const cartLoadingTrue = () => {
    return {
        type:CART_LOADING_TRUE
    }
}
const cartLoadingFalse = () => {
    return {
        type:CART_LOADING_FALSE
    }
}

const saveCart = (data) => {
    return{
        type:GET_CART,
        data
    }
}

export const getCart = (userId) => {
    return (dispatch) => {
        dispatch(cartLoadingTrue());
        let token = JSON.parse(localStorage.getItem('userDetails')).token
        Axios.get('carts/read',
        {
            headers:{'HTTP_AUTHORIZATION':token}
        })
        .then (res => {
            // console.log(res.data)
            if(res.data.response === true){
                dispatch(saveCart(res.data.data));
                dispatch(cartLoadingFalse());
            } else {
                dispatch(cartLoadingFalse());
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
}