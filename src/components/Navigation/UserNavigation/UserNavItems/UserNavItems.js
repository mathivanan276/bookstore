import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './UserNavItems.module.css';

const UserNavItems = (props) => {
    if(props.link === '/'){
        return  <NavLink 
                to={props.link}
                className={classes.UserNavItems}>{props.children}</NavLink>
    }
    return (
        <NavLink 
        to={props.link} 
        activeClassName={classes.active}
        className={classes.UserNavItems}>{props.children}</NavLink>
    )
}

export default UserNavItems;