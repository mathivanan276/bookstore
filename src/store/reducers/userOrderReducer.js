import * as actionType from '../actions/userOrdersAction';

const initialState = {
    ordersLoading: true,
    orders: {}
}

const reducer  = (state = initialState , action ) => {
    switch(action.type){
        case actionType.GET_USER_ORDERS : 
            return{
                ...state,
                orders: action.data
            }
        case actionType.USER_ORDERS_LOADING_TRUE :
            return{
                ...state,
                ordersLoading:true
            }
        case actionType.USER_ORDERS_LOADING_FALSE :
            return{
                ...state,
                ordersLoading:false
            }
        default : 
            return state;
    }
}

export default reducer;