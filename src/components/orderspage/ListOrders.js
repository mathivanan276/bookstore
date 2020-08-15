import React from 'react';

import classes from './ListOrders.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const ListOrders = (props) => {
    let table = <table className={classes.Table}>
                    <thead>
                        <th>S.NO</th>
                        <th>Qty</th>
                        <th>USERNAME</th>
                        <th>CREATED-ON</th>
                        <th></th>
                    </thead>
                    {
                        props.ordersArr.map( (list,index) => {
                            let date = new Date(list.createdAt)
                            //time convertion
                                let time = date.toTimeString().split(':');
                                let hours = time[0];
                                let meridian = '';
                                if(time[0] > 12){
                                    let hour = time[0]%12;
                                    hours = 12+hour;
                                    meridian = 'pm';
                                } else {
                                    meridian ='am';
                                }
                                time[2] = time[2].split(' ').shift();
                                let finalTime = time.join(':')+ ' '+meridian;
                            return <tr key={list.orderId}>
                                        <td>{index+1}</td>
                                        <td>{list.itemQuantity}</td>
                                        <td>{list.userName}</td>
                                        {/* <td>{date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear()}</td> */}
                                        <td>{date.toDateString()+' '+finalTime}</td>
                                        <td>
                                            <Link to='#' className={classes.Link}>View Order</Link>
                                        </td>
                                    </tr>
                        })
                    }
            </table>
    return (
        <div className={classes.Section}>
            {table}
        </div>
    )
}

export default ListOrders;