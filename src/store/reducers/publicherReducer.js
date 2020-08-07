import * as actionType from '../actions/publisherAction'; 

const initialState = {
    publisher: [{
        id:1
    }]
}

const reducer = (state = initialState , action) => {

    if(action.type === actionType.GET_PUBLISHER) {
        return {
            ...state,
            publisher: action.data.data
        }
    }
    return state;
}

export default reducer;