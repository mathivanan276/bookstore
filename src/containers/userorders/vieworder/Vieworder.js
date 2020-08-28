import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Vieworder.module.css';
import * as orderSummaryActionTypes from "../../../store/actions/orderSummaryAction";
import { Redirect } from 'react-router-dom';
import Spinner from '../../../components/UI/spinner/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { timeConvertion } from '../../../components/orderspage/ListOrders';

class Vieworder extends Component {
    componentDidMount(){
        this.props.getOrderSummary(this.props.match.params.cartId);
    }

    render(){
        if(localStorage.getItem('userDetails') === null){
            return <Redirect to='/login' />
        }
        if(JSON.parse(localStorage.getItem('userDetails')).role === 'admin'){
            return <Redirect to='/login' />
        }
        if(this.props.ordersLoading){
            return  <div>
                        <Spinner />
                    </div>;
        }
        let items = null;
        let items2 = null;
        let items3 = null;
        let items4 = null;
        if(this.props.ordersLoading){
            items = <div>
                        <Spinner />
                    </div>
            items2 =    <div>
                            <Spinner />
                        </div>
        }
        if(this.props.ordersLoading === false){
            items = this.props.orderSummary.items.map( (data,index) => 
                    <div className={classes.Bookcard}><div className={classes.Bookcover}>
                        <img src={data.url} alt='book Cover' width='100px' height='125px' />
                    </div> 
                    <div className={classes.Bookdetails}>
                        <h3>{data.title}</h3>
                        <p><span className={classes.Bold}>Qty :</span>{data.quantity}</p>
                        <p><span className={classes.Bold}>Total Price :</span>{data.price}</p>
                    </div>
                    </div>
            )
            items2 = <table className={classes.Table2}>
                        <tr>
                        <td>SUB-TOTAL</td>
                        <td>{this.props.orderSummary.priceInfo['SubTotal']} <small><FontAwesomeIcon icon={faRupeeSign} /></small></td>
                        </tr>
                        <tr>
                            <td>SHIPPING-FEE</td>
                            <td>{this.props.orderSummary.priceInfo['ShippingCost']} <small><FontAwesomeIcon icon={faRupeeSign} /></small></td>
                        </tr>
                        <tr>
                            <td>TOTAL</td>
                            <td>{this.props.orderSummary.priceInfo['Total']} <small><FontAwesomeIcon icon={faRupeeSign} /></small></td>
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
                    <div> 
                        {items}
                    </div>
                        {items2}
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

export default connect(mapStatesToProps,mapDispatchToProps)(Vieworder);