import React from 'react';

import classes from './UserNav.module.css';
import UserNavItems from './UserNavItems/UserNavItems';

const UserNav = () => {
    return (
        <nav className={classes.Navbar}>
            <UserNavItems link='/'>home</UserNavItems>
            <UserNavItems link='/new-arivals'>New Arivals</UserNavItems>
            <UserNavItems>Categories</UserNavItems>
            <UserNavItems>login</UserNavItems>
        </nav>
    );
}

export default UserNav;