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
export const sortedOrder = (sortKey) => {
    return (dispatch) => {
        dispatch(userOrdersLoadingTrue());
        if(localStorage.getItem('userDetails')){
        const token = JSON.parse(localStorage.getItem('userDetails')).token;
        Axios.post('orders/userorders',{
            month:sortKey
        },{
            headers:{'HTTP_AUTHORIZATION' : token}
        })
        .then (res => {
            console.log(res.data);
            if(res.data.response === true){
                dispatch(saveUserOrders(res.data.data));
                dispatch(userOrdersLoadingFalse());
            }else if (res.data.error !== ''){
                console.log(res.data);
                alert('Your Session Is Closed');
                localStorage.removeItem('userDetails');
                localStorage.removeItem('expireDate');
                window.location.reload(false);
            } 
            else{
                dispatch(saveUserOrders({}));
                dispatch(userOrdersLoadingFalse());
            }
        }) 
        .catch(err => {
            console.log(err);
        })
    }
}
}
export const searchorder = (keyword) => {
    return (dispatch) => {
        dispatch(userOrdersLoadingTrue());
        if(localStorage.getItem('userDetails')){
        const token = JSON.parse(localStorage.getItem('userDetails')).token;
        Axios.post('orders/userordersearch',{
            keyword
        },{
            headers:{'HTTP_AUTHORIZATION' : token}
        })
        .then (res => {
            console.log(res.data);
            if(res.data.response === true){
                dispatch(saveUserOrders(res.data.data));
                dispatch(userOrdersLoadingFalse());
            }else if (res.data.error !== ''){
                console.log(res.data);
                alert('Your Session Is Closed');
                localStorage.removeItem('userDetails');
                localStorage.removeItem('expireDate');
                window.location.reload(false);
            } 
            else{
                dispatch(saveUserOrders({}));
                dispatch(userOrdersLoadingFalse());
            }
        }) 
        .catch(err => {
            console.log(err);
        })
    }
    }
}