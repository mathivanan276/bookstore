import * as actionTypes from '../actions/loginActions';

const initialState = {
    isLoading:false,
    loggedIn : false,
    error: false,
    errorType: {
        emailErr:'',
        passwordErr:''
    },
    userDetails : {
        username: '',
        role: 'user',
        email:'',
        userId: '',
        token:'',
        expiresIn:''
    }
}

// const userdata = JSON.parse(localStorage.getItem('userDetails'));

// if(userdata !== null){
//     initialState = {
//         loggedIn : true,
//         userDetails : {
//             username: userdata.username ,
//             role: userdata.role,
//             email: userdata.email,
//             userId: userdata.userId
//         }
//     }
// }

const reducer = ( state = initialState, action ) => {
    switch(action.type){
        case (actionTypes.LOGIN_LOADING_TRUE) : 
            return{
                ...state,
                isLoading : true
            }
        case (actionTypes.LOGIN_LOADING_FALSE) : 
            return{
                ...state,
                isLoading : false
            }
        case (actionTypes.USER_LOGIN) :
            localStorage.setItem('userDetails',JSON.stringify(action.data));
            localStorage.setItem('expireDate',new Date(new Date().getTime()+(3600*1000)))
            return{
                ...state,
                loggedIn:true,
                userDetails:{
                    userId : action.data.id,
                    username : action.data.username,
                    email : action.data.email,
                    role : action.data.role,
                    token : action.data.token,
                    expiresIn:action.data.expiresIn
                }
            }
        case (actionTypes.LOGIN_ERROR) :
            return{
                ...state,
                error:true,
                errorType : {
                    emailErr : action.error.emailErr,
                    passwordErr: action.error.passwordErr
                }
            }
        case (actionTypes.LOGOUT) : 
            return{
                ...state,
                isLoading:false,
                loggedIn : false,
                error: false,
                errorType: {
                    emailErr:'',
                    passwordErr:''
                },
                userDetails : {
                    username: '',
                    role: 'user',
                    email:'',
                    userId: '',
                    token:'',
                    expiresIn:''
                }
            }
        case actionTypes.LOGGED_IN_VERIFY :
            return{
                ...state,
                loggedIn:true,
                userDetails:{
                    userId : action.data.id,
                    username : action.data.username,
                    email : action.data.email,
                    role : action.data.role,
                    token : action.data.token,
                    expiresIn:action.data.expiresIn
                }
            }
        default: 
            return state;
    }
    // if(action.type === actionTypes.USER_LOGIN){
    //     localStorage.setItem('userDetails',JSON.stringify(action.data))
    //     return{
    //         ...state,
    //         loggedIn: !state.loggedIn,
    //         userDetails: {
    //             userId : action.data.id,
    //             username : action.data.username,
    //             email : action.data.email,
    //             role : action.data.role,
    //             token : action.data.token
    //         } 

    //     }
    // }
    // if(action.type === actionTypes.LOGOUT){
    //     localStorage.removeItem('userDetails');
    //     return{
    //         ...state,
    //         loggedIn: !state.loggedIn,
    //         userDetails : {
    //             username: '',
    //             role: 'user',
    //             email:'',
    //             userId: ''
    //         }
    //     }
    // }
    // return state;
}

export default reducer;