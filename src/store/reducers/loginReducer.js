import * as actionTypes from '../actions/loginActions';

let initialState = {
    loggedIn : false,
    validated: false,
    userDetails : {
        username: '',
        role: 'admin',
        email:'',
        userId: ''
    }
}

const userdata = JSON.parse(localStorage.getItem('userDetails'));

if(userdata !== null){
    initialState = {
        loggedIn : true,
        userDetails : {
            username: userdata.username ,
            role: userdata.role,
            email: userdata.email,
            userId: userdata.userId
        }
    }
}

const reducer = ( state = initialState, action ) => {
    if(action.type === actionTypes.USER_LOGIN){
        localStorage.setItem('userDetails',JSON.stringify(action.data))
        return{
            ...state,
            loggedIn: !state.loggedIn,
            userDetails: {
                userId : action.data.id,
                username : action.data.username,
                email : action.data.email,
                role : action.data.role
            } 

        }
    }
    if(action.type === actionTypes.ADMIN_LOGIN){
        localStorage.setItem('adminDetails',JSON.stringify(action.data))
        return{
            ...state,
            loggedIn: !state.loggedIn,
            userDetails: {
                userId : action.data.id,
                username : action.data.username,
                email : action.data.email,
                role : action.data.role
            } 

        }
    }
    if(action.type === actionTypes.LOGOUT){
        localStorage.removeItem('userDetails');
        localStorage.removeItem('adminDetails');
        return{
            ...state,
            loggedIn: !state.loggedIn,
            userDetails : {
                username: '',
                role: 'admin',
                email:'',
                userId: ''
            }
        }
    }
    return state;
}

export default reducer;