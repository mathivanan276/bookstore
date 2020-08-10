import React,{ useState } from 'react';

import classes from './UserNav.module.css';
import UserNavItems from './UserNavItems/UserNavItems';

const UserNav = (props) => {

    const [menuButton , setMenuButton ] = useState(false);

    let login = <UserNavItems link='/login'>LogIn</UserNavItems>
    let register = <UserNavItems link='/register'>Register</UserNavItems>
    if(props.isLogged === true){
        login = <p onClick={props.logout} className={classes.Logout}>LogOut</p>;
        register = null;
    }

    let nav = null;

    if(menuButton){
        nav =   <nav className={classes.Navbar}>
                    <UserNavItems link='/home'>home</UserNavItems>
                    <UserNavItems link='/new-arivals'>New Arivals</UserNavItems>
                    <UserNavItems link='/categories'>Categories</UserNavItems>
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
                <div className={classes.Logo}>
                    <h1>Readers.com</h1>
                </div>
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