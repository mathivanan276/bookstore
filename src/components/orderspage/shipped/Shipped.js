import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter,Redirect } from 'react-router-dom';

import classes from './Shipped.module.css';
import * as orderSummaryActionTypes from "../../../store/actions/orderSummaryAction";

class Shipped extends Component {
    componentDidMount(){
        this.props.getOrderSummary(this.props.match.params.cartId);
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
        if(this.props.ordersLoading){
            return <h1>Loading</h1>;
        }
        let items = null;
        let items2 = null;
        let items3 = null;
        let items4 = null;
        if(this.props.ordersLoading){
            items = <p>Loading..</p>
            items2 = <p>Loading..</p>
        }
        if(this.props.ordersLoading === false){
            if(this.props.orderSummary.shipping !== 'Shipped'){
                // window.location.reload(false);
                return <Redirect to='/admin/home' />;
            }
            items = this.props.orderSummary.items.map( (data,index) => 
                <tr key={data.itemId}>
                    <td>{index+1}</td>
                    <td>{data.itemId}</td>
                    <td>{data.title}</td>
                    <td>{data.quantity}</td>
                    <td>{data.price}</td>
                </tr>
            )
            items2 = <table className={classes.Table2}>
                        <tr>
                        <td>SUB-TOTAL</td>
                        <td>:</td>
                        <td>{this.props.orderSummary.priceInfo['SubTotal']}</td>
                        </tr>
                        <tr>
                            <td>SHIPPING-FEE</td>
                            <td>:</td>
                            <td>{this.props.orderSummary.priceInfo['ShippingCost']}</td>
                        </tr>
                        <tr>
                            <td>TOTAL</td>
                            <td>:</td>
                            <td>{this.props.orderSummary.priceInfo['Total']}</td>
                        </tr>
                    </table>
                items3 = <table className={classes.Table2}>
                            <tr>
                                <td>FirstName :</td>
                                <td>{this.props.orderSummary.userInfo.firstName}</td>
                            </tr>
                            <tr>
                                <td>LastName :</td>
                                <td>{this.props.orderSummary.userInfo.lastName}</td>
                            </tr>
                            <tr>
                                <td>Phone :</td>
                                <td>{this.props.orderSummary.userInfo.mobile}</td>
                            </tr>
                        </table>
                items4 = <address className={classes.Address}>
                                Street:{this.props.orderSummary.addressInfo.StreetAddress}<br/>
                                District:{this.props.orderSummary.addressInfo.District}<br/>
                                State:{this.props.orderSummary.addressInfo.State}<br/>
                                Pin:{this.props.orderSummary.addressInfo.PinCode}
                        </address>
        }
        return (
            <div className={classes.Bg}>
            <div className={classes.Section}>
                <div className={classes.Container}>
                    <h3>Order Summery</h3>
                    <div className={classes.Items}> 
                        <table className={classes.Table}>
                            <tr>
                                <th>S.NO</th>
                                <th>ITEM-ID</th>
                                <th>TITLE</th>
                                <th>QTY</th>
                                <th>PRICE</th>
                            </tr>
                            {items}
                        </table>
                    </div>
                        {items2}
                    <h3>User Details</h3>
                        {items3}
                    <h3>Address</h3>
                        {items4}
                </div>
            </div>
            </div>
        );
    }
}

const mapStatesToProps = state => {
    return{
        orderSummary : state.orderSummaryReducer.orderSummary,
        ordersLoading : state.orderSummaryReducer.orderSummaryLoading,
        loggedIn : state.loginReducer.loggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return{
        getOrderSummary : (cartId) => dispatch(orderSummaryActionTypes.getOrderSummary(cartId))
    }
}
export default connect(mapStatesToProps,mapDispatchToProps)(withRouter(Shipped));