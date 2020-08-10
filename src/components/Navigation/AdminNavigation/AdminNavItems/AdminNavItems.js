import React from 'react'
import { NavLink } from 'react-router-dom';

import classes from './AdminNavItems.module.css';

const AdminNavItems = (props) => {
    return (
        <NavLink to={props.link} activeClassName={classes.active} onClick={props.clicked} className={classes.AdminNavItems} >{props.children}</NavLink>
    )
}

export default AdminNavItems;