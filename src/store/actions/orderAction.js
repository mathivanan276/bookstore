import Axios from 'axios';

export const GET_ORDERS = 'SET_ORDERS';
export const ORDERS_LOADING_TRUE = 'ORDERS_LOADING_TRUE';
export const ORDERS_LOADING_FALSE = 'ORDERS_LOADING_FALSE';
export const GET_ORDER_SUMMARY = 'GET_ORDER_SUMMARY';

const saveOrders = (data) => {
    return {
        type: GET_ORDERS,
        data: data
    }
}

const ordersLoadingTrue = () => {
    return {
        type:ORDERS_LOADING_TRUE
    }
}

const ordersLoadingFalse = () => {
    return {
        type:ORDERS_LOADING_FALSE
    }
}

export const getorders = () => {
    return (dispatch) => {
        dispatch(ordersLoadingTrue());
        Axios.get('/orders/getallorders')
        .then(res => {
            if(res.data.response === true){
                dispatch(saveOrders(res.data.data));
                dispatch(ordersLoadingFalse());
            }
        })
    }
}

const saveOrderSummary = (data) => {
    return {
        type: GET_ORDER_SUMMARY,
        data
    }
}

export const getOrderSummary = (cartId) => {
    return (dispatch) => {
        dispatch(ordersLoadingTrue());
        Axios.get('/orders/ordersummary/'+cartId)
        .then(res => {
            if(res.data.response === true){
                // console.log(res.data)
                dispatch(saveOrderSummary(res.data.data));
                dispatch(ordersLoadingFalse());
            }
        })
    }
}