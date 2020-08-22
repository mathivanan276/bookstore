import React, { Component } from 'react';

import classes from './Userorders.module.css';
import Orderslist from './orderslist/Orderslist';

class Userorders extends Component {
    state = {
        listType: 'Confirmed'
    }
    handleListType = (event) => {
        this.setState({
            ...this.state,
            listType: event.target.value
        })
    }
    render() {
        return (
            <div className={classes.Section}>
                <h3>Your Orders</h3>
                <select defaultValue={this.state.listType} name='listType' onChange={this.handleListType}>
                    <option value='Confirmed'>Confirmed</option>
                    <option value='Shipping'>Shipping</option>
                    <option value='Delivered'>Delivered</option>
                    <option value='Cancelled'>Cancelled</option>
                </select>
                <Orderslist listType={this.state.listType} />
            </div>
        )
    }
}

export default Userorders;