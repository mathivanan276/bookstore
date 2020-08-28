import * as orderActionType from '../actions/orderSummaryAction';

const initialState = {
    orderSummary : {},
    orderSummaryLoading: true
}

const reducer = (state = initialState , action ) => {
    switch(action.type){
        case (orderActionType.GET_ORDER_SUMMARY) :
            return {
                ...state,
                orderSummary: action.data
            }
        case (orderActionType.ORDERS_SUMMARY_LOADING_TRUE):
                return {
                    ...state,
                    orderSummaryLoading:true
                }
        case (orderActionType.ORDERS_SUMMARY_LOADING_FALSE):
                return {
                    ...state,
                    orderSummaryLoading:false
                }
        
        default :
            return false;
    }
}

export default reducer;