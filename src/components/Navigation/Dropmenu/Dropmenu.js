import React from 'react'
import classes from './Dropmenu.module.css';
import UserNavItems from '../UserNavigation/UserNavItems/UserNavItems';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

const Dropmenu = (props) => {
        return (
            <div>
                <div className={classes.Desktop}>
                    <div className={classes.Dropmenu}>
                        <span className={classes.Menu}>Account Setting</span>
                        <div className={classes.DropItems} style={{marginTop:'1rem'}}>
                            <NavLink to='/profile' activeClassName={classes.Active} onClick={props.clicked}>Profile</NavLink>
                            <NavLink to='/orders' activeClassName={classes.Active} onClick={props.clicked}>Orders</NavLink>
                        </div>
                    </div>
                </div>
                <div className={classes.Mobile}>
                            <UserNavItems link='/profile' 
                            clicked={props.clicked}
                            >Profile</UserNavItems>
                            <UserNavItems link='/orders' clicked={props.clicked} activeClassName={classes.Active} onClick={props.clicked}>Orders</UserNavItems>
                </div>
            </div>
        )
}

export default Dropmenu;