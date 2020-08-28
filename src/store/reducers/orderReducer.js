import * as orderActionType from '../actions/orderAction';

const initialState = {
    orders : {},
    ordersLoading: true
}

const reducer = (state = initialState , action ) => {
    switch(action.type){
        case (orderActionType.GET_ORDERS) : 
            return {
                ...state,
                orders: action.data
            }

        case (orderActionType.ORDERS_LOADING_TRUE):
                return {
                    ...state,
                    ordersLoading:true
                }
        case (orderActionType.ORDERS_LOADING_FALSE):
                return {
                    ...state,
                    ordersLoading:false
                }
        
        default :
            return false;
    }
}

export default reducer;