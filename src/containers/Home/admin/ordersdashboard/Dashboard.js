import React, { Component } from 'react';

import classes from './Dashboard.module.css';

class Dashboard extends Component {
    render() {
        return (
            <div className={classes.Dashboard}>
                <nav>
                    <ul>
                        <li onClick={()=>this.props.clicked('Confirmed')}><span style={{color:'green'}}>Confirmed <sup className={classes.Notify}>{this.props.confirmed}</sup></span></li>
                        <li onClick={()=>this.props.clicked('Shipping')}><span style={{color:'#00609a'}} >Shipping</span></li>
                        <li onClick={()=>this.props.clicked('Shipped')}><span style={{color:'#00609a'}}>Delivered</span></li>
                        <li onClick={()=>this.props.clicked('Cancelled')}><span style={{color:'red'}}>Cancelled</span></li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Dashboard;