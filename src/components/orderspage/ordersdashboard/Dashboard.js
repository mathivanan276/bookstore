import React, { Component } from 'react';

import classes from './Dashboard.module.css';

const Dashboard = (props) =>{
    let notify = null;
    if(props.confirmed && props.confirmed > 0){
        notify = <sup className={classes.Notify}>{props.confirmed}</sup>
    }
        return (
            <div className={classes.Dashboard}>
                <nav>
                    <ul>
                        <li onClick={()=>props.clicked('Confirmed')}><span style={{color:'green'}}>Confirmed {notify}</span></li>
                        <li onClick={()=>props.clicked('Shipping')}><span style={{color:'#00609a'}} >Shipping</span></li>
                        <li onClick={()=>props.clicked('Shipped')}><span style={{color:'#00609a'}}>Delivered</span></li>
                        <li onClick={()=>props.clicked('Cancelled')}><span style={{color:'red'}}>Cancelled</span></li>
                    </ul>
                </nav>
            </div>
        )
    }

export default Dashboard;