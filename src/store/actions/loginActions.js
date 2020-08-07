export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';


export const login = (id,username,email,role) =>{
    return {
        type:LOGIN,
        data:{ 
            id:id, username:username, email:email,role:role }
    }
}