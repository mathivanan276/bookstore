import React, { Component } from 'react'

import UserNavigation from '../../components/Navigation/UserNavigation/UserNav';
import AdminNavigation from '../../components/Navigation/AdminNavigation/AdminNav';

class Navigation extends Component {

    render(){
        let navbar = <AdminNavigation />
        if(this.props.role === 'user'){
            navbar = <UserNavigation />
        }
        return(
            <div>
                {navbar}
            </div>
        );
    }
}

export default Navigation;