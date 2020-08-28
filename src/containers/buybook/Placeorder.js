import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Placeorder.module.css';
import * as cartActionTypes from '../../store/actions/cartAction';


class Placeorder extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        carts : state.cartReducer.cart,
        cartLoading : state.cartReducer.cartLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCart : () => dispatch(cartActionTypes.getCart())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Placeorder);