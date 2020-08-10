import React,{ useState } from 'react';

import classes from './UserNav.module.css';
import UserNavItems from './UserNavItems/UserNavItems';

const UserNav = (props) => {

    const [menuButton , setMenuButton ] = useState(false);

    let login = <UserNavItems link='/login' clicked={()=>setMenuButton(!menuButton)}>LogIn</UserNavItems>
    let register = <UserNavItems link='/register' clicked={()=>setMenuButton(!menuButton)}>Register</UserNavItems>
    if(props.isLogged === true){
        login = <p onClick={()=>{ props.logout();
                                  setMenuButton(!menuButton)}} className={classes.Logout}>LogOut</p>;
        register = null;
    }

    let nav = null;

    if(menuButton){
        nav =   <nav className={classes.Navbar}>
                    <UserNavItems link='/home' clicked={()=>setMenuButton(!menuButton)}>home</UserNavItems>
                    <UserNavItems link='/new-arivals' clicked={()=>setMenuButton(!menuButton)}>New Arivals</UserNavItems>
                    <UserNavItems link='/categories' clicked={()=>setMenuButton(!menuButton)}>Categories</UserNavItems>
                    {login}
                    {register}
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
                <nav className={classes.Navbar}>
                    <UserNavItems link='/home'>home</UserNavItems>
                    <UserNavItems link='/new-arivals'>New Arivals</UserNavItems>
                    <UserNavItems link='/categories'>Categories</UserNavItems>
                    {login}
                    {register}
                </nav>
            </div>
        </div>
    );
}

export default UserNav;