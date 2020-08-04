import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionType from '../../store/actions';
import UserNavigation from '../../components/Navigation/UserNavigation/UserNav';
import AdminNavigation from '../../components/Navigation/AdminNavigation/AdminNav';

class Navigation extends Component {

    render(){
        let navbar = <AdminNavigation />
        if(this.props.role === 'user'){
            navbar = <UserNavigation isLogged={this.props.isLoggedIn} login={this.props.login} logout={this.props.logout}/>
        }
        return(
            <div>
                {navbar}
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        isLoggedIn : state.loggedIn,
        role : state.userDetails.role
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: () => dispatch({type : actionType.LOGIN}),
        logout: () => dispatch({type : actionType.LOGOUT})
    }
}

export default connect( mapStateToProps,mapDispatchToProps )(Navigation);