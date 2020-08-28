import * as actionTypes from '../actions/cartAction';

const initialState = {
    cart : {},
    cartLoading: true
}

const reducer = (state=initialState , action ) => {
    switch(action.type) {
        case actionTypes.CART_LOADING_TRUE : {
            return {
                ...state,
                cartLoading:true
            }
        }
        case actionTypes.CART_LOADING_FALSE : {
            return {
                ...state,
                cartLoading:false
            }
        }
        case actionTypes.GET_CART : {
            return {
                ...state,
                cart: action.data
            }
        }
        default : 
            return state;
    }
}

export default reducer;