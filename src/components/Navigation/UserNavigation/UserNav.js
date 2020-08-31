import React,{ useState } from 'react';

import classes from './UserNav.module.css';
import UserNavItems from './UserNavItems/UserNavItems';
import Dropmenu from '../Dropmenu/Dropmenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const UserNav = (props) => {

    const [menuButton , setMenuButton ] = useState(false);

    const Opened = classes.Dropmenu+' '+classes.Open;
    const Closed = classes.Dropmenu+' '+ classes .Close;

    let login = <UserNavItems link='/login' clicked={()=>setMenuButton(!menuButton)}>LogIn</UserNavItems>
    let register = <UserNavItems link='/register' clicked={()=>setMenuButton(!menuButton)}>Register</UserNavItems>
    if(props.isLogged === true){
        login = <>
                    <UserNavItems link='/cart' clicked={()=>setMenuButton(!menuButton)}>Cart</UserNavItems>
                    <Dropmenu clicked={()=>setMenuButton(!menuButton)}/>
                    <p onClick={()=>{ props.logout(); window.location.reload(false) ;setMenuButton(!menuButton)}} className={classes.Logout}>LogOut</p>
                </>
        register = null;
    }
    return (    
        <>
            <div className={classes.MobileNav}>
                <h1>Readers.com</h1>
                <div><p onClick={()=>setMenuButton(!menuButton)}><FontAwesomeIcon icon={faBars} /></p></div>
            </div>
            <div className={menuButton ? Opened : Closed}>
                <nav className={classes.MobileNavbar}>
                    <UserNavItems link='/home' clicked={()=>setMenuButton(!menuButton)}>home</UserNavItems>
                    <UserNavItems link='/categories' clicked={()=>setMenuButton(!menuButton)}>Categories</UserNavItems>
                    {login}
                    {register}
                </nav>
            </div>
            <div className={classes.DesktopNav}>
                <h1>Readers.com</h1>
                <nav className={classes.Navbar}>
                    <UserNavItems link='/home'>home</UserNavItems>
                    <UserNavItems link='/categories'>Categories</UserNavItems>
                    {login}
                    {register}
                </nav>
            </div>
        </>
    );
}

export default UserNav;