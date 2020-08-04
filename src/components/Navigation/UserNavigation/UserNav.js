import React from 'react';

import classes from './UserNav.module.css';
import UserNavItems from './UserNavItems/UserNavItems';

const UserNav = (props) => {
    let login = <button onClick={props.login}>LogIn</button>
    if(props.isLogged === true){
        login = <button onClick={props.logout}>LogOut</button>
    }
    return (
        <nav className={classes.Navbar}>
            <UserNavItems link='/'>home</UserNavItems>
            <UserNavItems link='/new-arivals'>New Arivals</UserNavItems>
            <UserNavItems>Categories</UserNavItems>
            {login}
        </nav>
    );
}

export default UserNav;