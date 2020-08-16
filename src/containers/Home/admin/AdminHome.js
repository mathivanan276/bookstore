import React, { Component } from 'react'

import classes from './AdminHome.module.css';
import Input from '../../../components/UI/form/input/Input';
import Button from '../../../components/UI/form/button/button';
import { connect } from 'react-redux';

import * as authorActionTypes from '../../../store/actions/authorAction';
import * as genreActionTypes from '../../../store/actions/genreAction';
import * as bookActionTypes from '../../../store/actions/bookAction';
import * as orderActionTypes from '../../../store/actions/orderAction';
import Dashboard from '../../../components/orderspage/ordersdashboard/Dashboard';
import ListOrders from '../../../components/orderspage/ListOrders';

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
    render(){
        let dash = null;
        if(this.props.ordersLoading){
            dash = <h2>Loading..</h2>
        }
        if(this.props.ordersLoading === false) {
            dash = <Dashboard confirmed={this.props.orders.Confirmed.length} currentType={this.state.page} clicked={this.handlepage} />
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
        return(
           <div className={classes.Section}>
                {dash}
                <ListOrders ordersArr={list ? list : []} type={this.state.page.toLowerCase()}/>
           </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        orders : state.orderReducer.orders,
        ordersLoading : state.orderReducer.ordersLoading
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getOrders: () => dispatch(orderActionTypes.getorders())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AdminHome);