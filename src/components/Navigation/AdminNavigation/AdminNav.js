import React from 'react';

import classes from './AdminNav.module.css';
import AdminNavItems from './AdminNavItems/AdminNavItems';

const AdminNav = () => {
    return (
        <nav className={classes.Navbar}>
            <AdminNavItems>Orders</AdminNavItems>
            <AdminNavItems>Books</AdminNavItems>
            <AdminNavItems>Authors</AdminNavItems>
            <AdminNavItems>Publishers</AdminNavItems>
            <AdminNavItems>Stocks</AdminNavItems>
        </nav>
    );
}

export default AdminNav;