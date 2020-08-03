import React from 'react'
import { Link } from 'react-router-dom';

import classes from './AdminNavItems.module.css';

const AdminNavItems = (props) => {
    return (
        <Link href={'/'+props.link} clLinkssName={classes.AdminNavItems}>{props.children}</Link>
    )
}

export default AdminNavItems;