import * as orderActionType from '../actions/orderAction';

const initialState = {
    orders : 'null'
}

const reducer = (state = initialState , action ) => {
    switch(action.type){
        case (orderActionType.GET_ORDERS) : 
            return {
                orders: action.data
            }
    }
    return state;
}

export default reducer;