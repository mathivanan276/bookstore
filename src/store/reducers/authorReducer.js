import * as actionType from '../actions/authorAction'; 

const initialState = {
    authors: [{
        id:1
    }]
}

const reducer = (state = initialState , action) => {

    if(action.type === actionType.GET_AUTHORS) {
        return {
            ...state,
            authors: action.data.data
        }
    }
    return state;
}

export default reducer;