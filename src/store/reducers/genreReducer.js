import * as actionType from '../actions/genreAction'; 

const initialState = {
    genre: [],
    genreLoading : true
}

const reducer = (state = initialState , action) => {

    switch(action.type){
        case actionType.GET_GENRE :
            return {
                ...state,
                genre: action.data.data
            }
        case actionType.GENRE_LODING_TRUE :
            return {
                ...state,
                genreLoading: true
            }
        case actionType.GENRE_LODING_FALSE :
            return {
                ...state,
                genreLoading: false
            }
        default :
            return state;
    }
}

export default reducer;