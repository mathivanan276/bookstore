import * as actionType from '../actions/authorAction'; 

const initialState = {
    authors: [],
    authorLoading: true
}

const reducer = (state = initialState , action) => {


    switch(action.type){
        case actionType.GET_AUTHORS :
            return {
                ...state,
                authors: action.data.data
            }
        case actionType.AUTHOR_LODING_TRUE :
            return {
                ...state,
                authorLoading: true
            }
        case actionType.AUTHOR_LODING_FALSE :
            return {
                ...state,
                authorLoading: false
            }
        default :
            return state;
    }
}

export default reducer;