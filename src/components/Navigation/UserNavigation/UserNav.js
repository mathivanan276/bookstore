import React from 'react';

import classes from './UserNav.module.css';
import UserNavItems from './UserNavItems/UserNavItems';

const UserNav = (props) => {
    let login = <UserNavItems link='/login'>LogIn</UserNavItems>
    let register = <UserNavItems link='/register'>Register</UserNavItems>
    if(props.isLogged === true){
        login = <p onClick={props.logout} className={classes.Logout}>LogOut</p>;
        register = null;
    }

    return (
        <nav className={classes.Navbar}>
            <UserNavItems link='/'>home</UserNavItems>
            <UserNavItems link='/new-arivals'>New Arivals</UserNavItems>
            <UserNavItems link='/categories'>Categories</UserNavItems>
            {login}
            {register}
        </nav>
    );
}

export default UserNav;