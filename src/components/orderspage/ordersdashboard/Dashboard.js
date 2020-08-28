import React from 'react';

import classes from './Dashboard.module.css';

const Dashboard = (props) =>{

    return (
        <div className={classes.Dashboard}>
            <nav>
                <ul>
                    <li onClick={()=>props.clicked('Confirmed')} className={props.currentType === 'Confirmed' ? classes.Bold : ''} ><span style={{color:'green'}}>Confirmed<sup className={classes.Notify}>{props.ordersCount.Confirmed}</sup></span></li>
                    <li onClick={()=>props.clicked('Shipping')} className={props.currentType === 'Shipping' ? classes.Bold : ''} ><span style={{color:'#00609a'}} >Shipping<sup className={classes.Notify}>{props.ordersCount.Shipping}</sup></span></li>
                    <li onClick={()=>props.clicked('Shipped')} className={props.currentType === 'Shipped' ? classes.Bold : ''} ><span style={{color:'#00609a'}}>Delivered<sup className={classes.Notify}>{props.ordersCount.Shipped}</sup></span></li>
                    <li onClick={()=>props.clicked('Cancelled')} className={props.currentType === 'Cancelled' ? classes.Bold : ''} ><span style={{color:'red'}}>Cancelled<sup className={classes.Notify}>{props.ordersCount.Cancelled}</sup></span></li>
                </ul>
            </nav>
        </div>
    )
    }

export default Dashboard;