import React from 'react';

import classes from './AdminNav.module.css';
import AdminNavItems from './AdminNavItems/AdminNavItems';

const AdminNav = (props) =>{
    
    let login = <AdminNavItems link='/login'>LogIn</AdminNavItems>
    if(props.isLogged === true){
        login = <p onClick={props.logout} className={classes.Logout}>LogOut</p>
    }

    return (
        <nav className={classes.AdminNavbar}>
                <AdminNavItems link="/admin/home">Home</AdminNavItems>
                <AdminNavItems link="/admin/orders">Orders</AdminNavItems>
                <AdminNavItems link="/admin/book/add">Books</AdminNavItems>
                <AdminNavItems link="/admin/authors">Authors</AdminNavItems>
                <AdminNavItems link="/admin/publishers">Publishers</AdminNavItems>
                <AdminNavItems link="/admin/stocks">Stocks</AdminNavItems>
                {login}
        </nav>
    );
}

export default AdminNav;