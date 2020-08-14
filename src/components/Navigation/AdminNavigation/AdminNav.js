import React,{ useState } from 'react';

import classes from './AdminNav.module.css';
import AdminNavItems from './AdminNavItems/AdminNavItems';

const AdminNav = (props) =>{

    const [menuButton , setMenuButton ] = useState(false);
    const Opened = classes.Dropmenu+' '+classes.Open;
    const Closed = classes.Dropmenu+' '+ classes .Close;
    return (
        <>
            <div>
                <div className={classes.MobileNav}>
                    <h1>Readers.com</h1>
                    <div><p onClick={()=>setMenuButton(!menuButton)}>menu</p></div>
                </div>
            </div>
            <div className={menuButton ? Opened : Closed}>
                <nav className={classes.MobileNavbar}>
                    <AdminNavItems link="/admin/home" clicked = {()=>setMenuButton(!menuButton)}>Home</AdminNavItems>
                    <AdminNavItems link="/admin/orders" clicked = {()=>setMenuButton(!menuButton)}>Orders</AdminNavItems>
                    <AdminNavItems link="/admin/book" clicked = {()=>setMenuButton(!menuButton)}>Books</AdminNavItems>
                    <AdminNavItems link="/admin/author" clicked = {()=>setMenuButton(!menuButton)}>Authors</AdminNavItems>
                    <AdminNavItems link="/admin/publisher" clicked = {()=>setMenuButton(!menuButton)}>Publishers</AdminNavItems>
                    <AdminNavItems link="/admin/genre" clicked = {()=>setMenuButton(!menuButton)}>Genre</AdminNavItems>
                    <AdminNavItems link="/admin/stocks" clicked = {()=>setMenuButton(!menuButton)}>Stocks</AdminNavItems>
                    <p onClick={()=>{props.logout(); setMenuButton(!menuButton); }} className={classes.Logout}>LogOut</p>
                </nav>
            </div>
            
            <div className={classes.DesktopNav}>
                <nav className={classes.AdminNavbar}>
                    <AdminNavItems link="/admin/home">Home</AdminNavItems>
                    <AdminNavItems link="/admin/orders">Orders</AdminNavItems>
                    <AdminNavItems link="/admin/book">Books</AdminNavItems>
                    <AdminNavItems link="/admin/author">Authors</AdminNavItems>
                    <AdminNavItems link="/admin/publisher">Publishers</AdminNavItems>
                    <AdminNavItems link="/admin/genre">Genre</AdminNavItems>
                    <AdminNavItems link="/admin/stocks">Stocks</AdminNavItems>
                    <p onClick={props.logout} className={classes.Logout}>LogOut</p>
                </nav>
            </div>
            </>
    );
}

export default AdminNav;