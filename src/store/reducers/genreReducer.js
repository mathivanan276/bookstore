import * as actionType from '../actions/genreAction'; 

const initialState = {
    genre: [{
        id:1
    }]
}

const reducer = (state = initialState , action) => {

    if(action.type === actionType.GET_GENRE) {
        return {
            ...state,
            genre: action.data.data
        }
    }
    return state;
}

export default reducer;