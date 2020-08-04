import * as actionTypes from './actions';

let initialState = {
    loggedIn : true,
    userDetails : {
        username: '',
        role: 'user',
        email:'',
        userId: ''
    }
}

const reducer = ( state = initialState, action ) => {
    if(action.type === actionTypes.LOGIN){
        return{
            ...state,
            loggedIn: !state.loggedIn
        }
    }
    if(action.type === actionTypes.LOGOUT){
        return{
            ...state,
            loggedIn: !state.loggedIn
        }
    }
    return state;
}

export default reducer;