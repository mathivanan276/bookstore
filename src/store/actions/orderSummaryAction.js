import Axios from 'axios';

export const ORDERS_SUMMARY_LOADING_TRUE = 'ORDERS_SUMMARY_LOADING_TRUE';
export const ORDERS_SUMMARY_LOADING_FALSE = 'ORDERS_SUMMARY_LOADING_FALSE';
export const GET_ORDER_SUMMARY = 'GET_ORDER_SUMMARY';

const ordersSummaryLoadingTrue = () => {
    return {
        type:ORDERS_SUMMARY_LOADING_TRUE
    }
}

const ordersSummaryLoadingFalse = () => {
    return {
        type:ORDERS_SUMMARY_LOADING_FALSE
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
        dispatch(ordersSummaryLoadingTrue());
        if(localStorage.getItem('userDetails')){
            let token = JSON.parse(localStorage.getItem('userDetails')).token
        Axios.get('/orders/ordersummary/'+cartId,{
            headers:{'HTTP_AUTHORIZATION':token}
        })
        .then(res => {
            if(res.data.response === true){
                // console.log(res.data)
                dispatch(saveOrderSummary(res.data.data));
                dispatch(ordersSummaryLoadingFalse());
            }else if (res.data.error !== ''){
                console.log(res.data);
                alert('Your Session Is Closed');
                localStorage.removeItem('userDetails');
                localStorage.removeItem('expireDate');
                window.location.reload(false);
            } 
        })
    }
    }
}