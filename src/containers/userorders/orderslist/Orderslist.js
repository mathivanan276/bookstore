import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Orderslist.module.css';

import * as userOrdersActionType from '../../../store/actions/userOrdersAction';
import Spinner from '../../../components/UI/spinner/Spinner';

class Orderslist extends Component {
    componentDidMount(){
        this.props.getUserOrders();
    }
    render() {
        if(this.props.ordersLoading){
            return  <div className={classes.Section}>
                        <Spinner />
                    </div>
        }
        let order = null;
        if(!this.props.ordersLoading){
            order = this.props.orders[this.props.listType];
            console.log(order); 
        }
        return (
            <div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ordersLoading : state.userOrderReducer.ordersLoading,
        orders : state.userOrderReducer.orders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserOrders : () => dispatch(userOrdersActionType.getUserOrders())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Orderslist);