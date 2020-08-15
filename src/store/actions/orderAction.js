import Axios from 'axios';

export const GET_ORDERS = 'SET_ORDERS';

const saveOrders = (data) => {
    return {
        type: GET_ORDERS,
        data: data
    }
}

export const getorders = () => {
    return (dispatch) => {
        Axios.get('/orders/getallorders')
        .then(res => {
            if(res.data.response === true){
                // console.log(res.data.data);
                dispatch(saveOrders(res.data.data))
            }
        })
    }
}