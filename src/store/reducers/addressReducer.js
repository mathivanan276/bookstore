import * as actionTypes from '../actions/addressAction';

const initialState = {
    addressLoading:true,
    address:{},
}

const reducer = (state=initialState , action) => {
    switch(action.type){
        case actionTypes.GET_ADDRESS :
            return {
                ...state,
                address:action.data
            }
        case actionTypes.ADDRESS_LOADING_TRUE : 
            return {
                ...state,
                addressLoading:true
            }
        case actionTypes.ADDRESS_LOADING_FALSE : 
            return {
                ...state,
                addressLoading:false
            }
        default :
            return state;
    }
}

export default reducer;