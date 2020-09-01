import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Userorders.module.css';
import Orderslist from './orderslist/Orderslist';
import Userordersort from '../../components/UI/userordersort/Userordersort';
import * as userOrdersActionType from '../../store/actions/userOrdersAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router-dom';

class Userorders extends Component {
    state = {
        sortKey: new Date().getFullYear()+'-'+(new Date().getMonth()+1 > 10 ? new Date().getMonth()+1 : '0'+(new Date().getMonth()+1)),
        searchKeyWord : ''
    }
    getSort = (sortKey) => {
        // console.log(sortKey)
        this.props.sortedOrders(sortKey)
        this.setState({
            ...this.state,
            sortKey
        })
    }
    search = (event) => {
        event.preventDefault();
        this.props.searchorders(this.state.searchKeyWord);
    }
    handleChange = (event) => {
        this.setState({
            ...this.state,
            searchKeyWord:event.target.value
        })
    }
    componentDidMount(){
        this.props.sortedOrders(this.state.sortKey)
    }
    render() {
        if(this.props.loggedIn){
            if(localStorage.getItem('userDetails') === null){
                return <Redirect to='/login' />
            }
            if(JSON.parse(localStorage.getItem('userDetails')).role === 'admin'){
                return <Redirect to='/login' />
            }
        }else {
            return <Redirect to='/home' />
        }
        return (
            <div className={classes.Section}>
                <div className={classes.Header}>
                    <h3>Your Orders</h3>
                    <div className={classes.Sort}>
                        <p>Sort By</p>
                        <Userordersort getSort={this.getSort} />
                    </div>
                </div>
                <div className={classes.Searchbar}>
                    <form onSubmit={this.search}>
                        <input type='text' placeholder='Enter Title' onChange={ this.handleChange } />
                        <span className={classes.Icon}><FontAwesomeIcon icon={faSearch} /></span>
                        <input type='submit' hidden />
                    </form>
                </div>
                <Orderslist orders={this.props.orders} ordersLoading={this.props.ordersLoading} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ordersLoading : state.userOrderReducer.ordersLoading,
        loggedIn : state.loginReducer.loggedIn,
        orders : state.userOrderReducer.orders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sortedOrders : (sortkey) => dispatch(userOrdersActionType.sortedOrder(sortkey)),
        searchorders : (keyword) => dispatch(userOrdersActionType.searchorder(keyword))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Userorders);