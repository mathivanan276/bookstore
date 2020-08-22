import Axios from 'axios';

export const GET_USER_ORDERS = 'GET_USER_ORDERS';
export const USER_ORDERS_LOADING_TRUE = 'USER_ORDERS_LOADING_TRUE';
export const USER_ORDERS_LOADING_FALSE = 'USER_ORDERS_LOADING_FALSE';


const userOrdersLoadingTrue = () => {
    return {
        type:USER_ORDERS_LOADING_TRUE
    }
}
const userOrdersLoadingFalse = () => {
    return {
        type:USER_ORDERS_LOADING_FALSE
    }
}

const saveUserOrders = (data) => {
    return{
        type:GET_USER_ORDERS,
        data
    }
}

export const getUserOrders = () => {
    return (dispatch) => {
        dispatch(userOrdersLoadingTrue());
        const token = JSON.parse(localStorage.getItem('userDetails')).token;
        Axios.get('orders/userorders',{
            headers:{'HTTP_AUTHORIZATION' : token}
        })
        .then (res => {
            // console.log(res.data);
            if(res.data.response === true){
                dispatch(saveUserOrders(res.data.data));
                dispatch(userOrdersLoadingFalse());
            }
        }) 
        .catch(err => {
            console.log(err);
        })
    }
}