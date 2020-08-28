import React, { Component } from 'react';
import classes from './Orderslist.module.css';

import Spinner from '../../../components/UI/spinner/Spinner';
import { timeConvertion } from '../../../components/orderspage/ListOrders';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

class Orderslist extends Component {

    render() {
        if(this.props.ordersLoading){
            return  <div className={classes.Section}>
                        <Spinner />
                    </div>
        }
        let orders = [];
        for(let keys in this.props.orders){
            orders.push({
                data:this.props.orders[keys],
                length:this.props.orders[keys].length
            })
        }
        let orderitems =    <div className={classes.Section}>
                                <h2>No Results Found</h2>
                                <Link to='/home'>Go To Home</Link>
                            </div>
        
        orderitems = orders.map( orders => {
            return orders.data.map( (data,index) => {
                if(index === 0){
                    let textColor = null;
                    switch(data.Shipping){
                        case 'Confirmed':textColor='black';
                            break;
                        case 'Shipped':textColor='green';
                            break;
                        case 'Shipping':textColor='blue';
                            break;
                        case 'Cancelled':textColor='red';
                            break;
                    }
                    return  <div className={classes.Bookcard}>
                                <div className={classes.Bookcover}>
                                    <img src={data.url} alt='book Cover' width='100px' height='125px' />
                                </div> 
                                <div className={classes.Bookdetails}>
                                    <h3>{data.title}<span style={{fontWeight:'normal'}}>{orders.length-1 ? '+'+(orders.length-1)+'Book' : null}</span></h3>
                                    <small className={classes.Status} >{data.Shipping}</small>
                                    <p><span className={classes.Bold}>Ordered On :</span>{ (new Date(data.createdAt)).toDateString() } - {timeConvertion(new Date(data.createdAt))}</p>
                                    <p><span className={classes.Bold}>Total Price :</span>{data.totalPrice}</p>
                                    {data.cancelable !== '0' && data.Shipping !== 'Cancelled' ? <Link to={'/orders/cancelorder/'+data.orderId}>Cancel Now</Link>:<Link>Buy Again</Link>}
                                    <Link to={'/orders/vieworder/'+data.cartId} >View Order</Link>
                                </div>
                            </div>
                }
            })
        })
        if(orders.length === 0){
            orderitems =    <div className={classes.Section}>
                                <h2>No Results Found</h2>
                                <Link to='/home'><FontAwesomeIcon icon={faHome} /> Home</Link>
                            </div>
        }
        return (
            <div className={classes.Section}>
                {orderitems}
            </div>
        )
    }
}

export default Orderslist;