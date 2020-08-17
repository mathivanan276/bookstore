import React,{ useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import classes from './Confirmed.module.css';
import * as orderActionTypes from "../../../store/actions/orderAction";

const Confirmed = (props) => {

    useEffect(() => {
        props.getOrderSummary(props.match.params.cartId);
    }, [])
    let items = null;
    let items2 = null;
    let items3 = null;
    let items4 = null;
    if(props.ordersLoading){
        items = <p>Loading..</p>
        items2 = <p>Loading..</p>
    }
    if(props.ordersLoading === false){
        items = props.orderSummary.items.map( (data,index) => 
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
                    <td>{props.orderSummary.priceInfo['SubTotal']}</td>
                    </tr>
                    <tr>
                        <td>SHIPPING-FEE</td>
                        <td>:</td>
                        <td>{props.orderSummary.priceInfo['ShippingCost']}</td>
                    </tr>
                    <tr>
                        <td>TOTAL</td>
                        <td>:</td>
                        <td>{props.orderSummary.priceInfo['Total']}</td>
                    </tr>
                </table>
            items3 = <table className={classes.Table2}>
                        <tr>
                            <td>FirstName :</td>
                            <td>{props.orderSummary.userInfo.firstName}</td>
                        </tr>
                        <tr>
                            <td>LastName :</td>
                            <td>{props.orderSummary.userInfo.lastName}</td>
                        </tr>
                        <tr>
                            <td>Phone :</td>
                            <td>{props.orderSummary.userInfo.mobile}</td>
                        </tr>
                    </table>
            items4 = <address className={classes.Address}>
                            Street:{props.orderSummary.addressInfo.StreetAddress}<br/>
                            District:{props.orderSummary.addressInfo.District}<br/>
                            State:{props.orderSummary.addressInfo.State}<br/>
                            Pin:{props.orderSummary.addressInfo.PinCode}
                    </address>
    }
    return (
        <div className={classes.Section}>
            <div className={classes.Container}>
                <h3>Order Summery</h3>
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
                    {items2}
                <h3>User Details</h3>
                    {items3}
                <h3>Address</h3>
                    {items4}
            </div>
        </div>
    )
}

const mapStatesToProps = state => {
    return{
        orderSummary : state.orderReducer.orderSummary,
        ordersLoading : state.orderReducer.ordersLoading
    }
}

const mapDispatchToProps = dispatch => {
    return{
        getOrderSummary : (cartId) => dispatch(orderActionTypes.getOrderSummary(cartId))
    }
}

export default connect(mapStatesToProps,mapDispatchToProps)(withRouter(Confirmed));