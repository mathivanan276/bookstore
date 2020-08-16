import * as actionType from '../actions/publisherAction'; 

const initialState = {
    publisher: [],
    publisherLoading: true
}

const reducer = (state = initialState , action) => {

    switch(action.type){
        case actionType.GET_PUBLISHER : 
            return {
                ...state,
                publisher: action.data.data
            }
        case actionType.PUBLISHER_LOADING_TRUE :
            return {
                ...state,
                publisherLoading:true
            }
        case actionType.PUBLISHER_LOADING_FALSE :
            return {
                ...state,
                publisherLoading:false
            }
        default :
            return state;
    }
}

export default reducer;