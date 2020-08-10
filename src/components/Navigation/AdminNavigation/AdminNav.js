import React,{ useState } from 'react';

import classes from './AdminNav.module.css';
import AdminNavItems from './AdminNavItems/AdminNavItems';

const AdminNav = (props) =>{

    const [menuButton , setMenuButton ] = useState(false);
    
    let login = <AdminNavItems link='/login' clicked = {()=>setMenuButton(!menuButton)}>LogIn</AdminNavItems>
    if(props.isLogged === true){
        login = <p onClick={props.logout} className={classes.Logout}>LogOut</p>
    }
    let nav = null;

    if(menuButton){
        nav =   <nav className={classes.AdminNavbar}>
                        <AdminNavItems link="/admin/home" clicked = {()=>setMenuButton(!menuButton)}>Home</AdminNavItems>
                        <AdminNavItems link="/admin/orders" clicked = {()=>setMenuButton(!menuButton)}>Orders</AdminNavItems>
                        <AdminNavItems link="/admin/book/add" clicked = {()=>setMenuButton(!menuButton)}>Books</AdminNavItems>
                        <AdminNavItems link="/admin/authors" clicked = {()=>setMenuButton(!menuButton)}>Authors</AdminNavItems>
                        <AdminNavItems link="/admin/publishers" clicked = {()=>setMenuButton(!menuButton)}>Publishers</AdminNavItems>
                        <AdminNavItems link="/admin/stocks" clicked = {()=>setMenuButton(!menuButton)}>Stocks</AdminNavItems>
                        {login}
                </nav>
    }

    return (
        <div className={classes.Container}>
            <div className={classes.MobileNav}>
                <h1>Readers.com</h1>
                <div><p onClick={()=>setMenuButton(!menuButton)}>menu</p></div>
            </div>

            {nav}
            <div className={classes.DesktopNav}>
                <div className={classes.Logo}> clicked = {()=>setMenuButton(!menuButton)}
                    <h1>Readers.com</h1>
                </div>
                <nav className={classes.AdminNavbar}>
                    <AdminNavItems link="/admin/home">Home</AdminNavItems>
                    <AdminNavItems link="/admin/orders">Orders</AdminNavItems>
                    <AdminNavItems link="/admin/book/add">Books</AdminNavItems>
                    <AdminNavItems link="/admin/authors">Authors</AdminNavItems>
                    <AdminNavItems link="/admin/publishers">Publishers</AdminNavItems>
                    <AdminNavItems link="/admin/stocks">Stocks</AdminNavItems>
                    {login}
                </nav>
            </div>
        </div>
    );
}

export default AdminNav;