import React,{ useState } from 'react';

import classes from './UserNav.module.css';
import UserNavItems from './UserNavItems/UserNavItems';

const UserNav = (props) => {

    const [menuButton , setMenuButton ] = useState(false);

    const Opened = classes.Dropmenu+' '+classes.Open;
    const Closed = classes.Dropmenu+' '+ classes .Close;

    let login = <UserNavItems link='/login' clicked={()=>setMenuButton(!menuButton)}>LogIn</UserNavItems>
    let register = <UserNavItems link='/register' clicked={()=>setMenuButton(!menuButton)}>Register</UserNavItems>
    if(props.isLogged === true){
        login = <p onClick={()=>{ props.logout();
                                  setMenuButton(!menuButton)}} className={classes.Logout}>LogOut</p>;
        register = null;
    }
    return (
        <>
            <div className={classes.MobileNav}>
                <h1>Readers.com</h1>
                <div><p onClick={()=>setMenuButton(!menuButton)}>menu</p></div>
            </div>
            <div className={menuButton ? Opened : Closed}>
                <nav className={classes.MobileNavbar}>
                    <UserNavItems link='/home' clicked={()=>setMenuButton(!menuButton)}>home</UserNavItems>
                    <UserNavItems link='/new-arivals' clicked={()=>setMenuButton(!menuButton)}>New Arivals</UserNavItems>
                    <UserNavItems link='/categories' clicked={()=>setMenuButton(!menuButton)}>Categories</UserNavItems>
                    {login}
                    {register}
                </nav>
            </div>
            <div className={classes.DesktopNav}>
                <nav className={classes.Navbar}>
                    <UserNavItems link='/home'>home</UserNavItems>
                    <UserNavItems link='/new-arivals'>New Arivals</UserNavItems>
                    <UserNavItems link='/categories'>Categories</UserNavItems>
                    {login}
                    {register}
                </nav>
            </div>
        </>
    );
}

export default UserNav;