import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import classes from './AdminHome.module.css';
import { connect } from 'react-redux';
import * as orderActionTypes from '../../../store/actions/orderAction';
import Dashboard from '../../../components/orderspage/ordersdashboard/Dashboard';
import ListOrders from '../../../components/orderspage/ListOrders';
import Spinner from '../../../components/UI/spinner/Spinner';
import Ordersearch from '../../../components/UI/ordersearch/Ordersearch';

class AdminHome extends Component {

    state={
        page:'Confirmed'
    }

    handlepage = (page) => {
        this.setState({
            ...this.state,
            page
        })
    }

    componentDidMount(){
        this.props.getOrders();
    }
    getSearch = (sortDate) => {
        this.props.sortedOrders(sortDate)
    }
    getRange = (date1,date2) => {
        this.props.rangeOrders(date1,date2)
    }
    render(){
        if(this.props.loggedIn){
            const adminData = JSON.parse(localStorage.getItem('userDetails')).role;
            if(adminData !== 'admin'){
                return <Redirect to='/admin/login' />
            }
        } else {
            return <Redirect to='/home' />
        }
        let dash = null;
        if(this.props.ordersLoading){
            dash = <Spinner />
        }
        if(this.props.orders === 'No Records Found'){
            dash = <h3>No Records Found</h3>
        }
        
        let list= null;
        if(this.props.orders !== 'null' && this.props.ordersLoading === false){
            switch(this.state.page){
                case 'Confirmed':
                    list = this.props.orders.Confirmed;
                    break;
                case 'Shipping' :
                    list = this.props.orders.Shipping;
                    break;
                case 'Shipped' :
                    list = this.props.orders.Shipped;
                    break;
                case 'Cancelled' : 
                    list = this.props.orders.Cancelled;
                    break;
                default :
                    list = this.props.orders.Confirmed;
            }
        }
        if(this.props.ordersLoading === false && this.props.orders !== 'No Records Found') {
            let count = {
                Confirmed : this.props.orders.Confirmed.length,
                Shipping : this.props.orders.Shipping.length,
                Shipped : this.props.orders.Shipped.length,
                Cancelled : this.props.orders.Cancelled.length,
            }
            dash =  <> <Dashboard ordersCount={count} currentType={this.state.page} clicked={this.handlepage} />
                        <ListOrders ordersArr={list ? list : []} type={this.state.page.toLowerCase()}/></>
        }
        return(
           <div className={classes.Section}>
                <Ordersearch getsearch={this.getSearch} getRange={this.getRange}/>
                {dash}
           </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        orders : state.orderReducer.orders,
        ordersLoading : state.orderReducer.ordersLoading,
        loggedIn : state.loginReducer.loggedIn
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getOrders: () => dispatch(orderActionTypes.getorders()),
        sortedOrders: (sortDate) => dispatch(orderActionTypes.sortedOrders(sortDate)),
        rangeOrders: (date1,date2) => dispatch(orderActionTypes.rangedOrders(date1,date2))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AdminHome);