import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionType from '../../store/actions/loginActions';
import UserNavigation from '../../components/Navigation/UserNavigation/UserNav';
import AdminNavigation from '../../components/Navigation/AdminNavigation/AdminNav';

import classes from './Navigation.module.css';

class Navigation extends Component {

    render(){
        let navbar = <AdminNavigation isLogged={this.props.isLoggedIn} login={this.props.login} logout={this.props.logout}/>
        if(this.props.role === 'user'){
            navbar = <UserNavigation isLogged={this.props.isLoggedIn} login={this.props.login} logout={this.props.logout}/>
        }
        return(
            <div className={classes.Nav}>
                {navbar}
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        isLoggedIn : state.loginReducer.loggedIn,
        role : state.loginReducer.userDetails.role
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch({type : actionType.LOGOUT})
    }
}

export default connect( mapStateToProps,mapDispatchToProps )(Navigation);