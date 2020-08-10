export const ADMIN_LOGIN = 'ADMIN_LOGIN';
export const USER_LOGIN = 'USER_LOGIN';
export const LOGOUT = 'LOGOUT';


export const adminlogin = (id,username,email,role) =>{
    return {
        type:ADMIN_LOGIN,
        data:{ 
            id:id, username:username, email:email,role:role }
    }
}

export const userlogin = (id,username,email,role) =>{
    return {
        type:USER_LOGIN,
        data:{ 
            id:id, username:username, email:email,role:role }
    }
}