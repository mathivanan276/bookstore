export const USER_LOGIN = 'USER_LOGIN';
export const LOGOUT = 'LOGOUT';

export const userlogin = (id,username,email,role,token) =>{
    return {
        type:USER_LOGIN,
        data:{ 
            id:id, username:username, email:email,role:role,token:token }
    }
}