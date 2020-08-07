import React from 'react';
import { Link } from 'react-router-dom';

import classes from './UserNavItems.module.css';

const UserNavItems = (props) => {
    return (
        <Link to={props.link} className={classes.UserNavItems}>{props.children}</Link>
    )
}

export default UserNavItems;