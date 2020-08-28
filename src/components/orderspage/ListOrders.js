import React from 'react';

import classes from './ListOrders.module.css';
import { Link } from 'react-router-dom';

export const timeConvertion = (date) => {
        let time = date.toTimeString().split(':');
        let hours = time[0];
        let meridian = '';
        if(time[0] > 12){
            let hour = time[0]%12;
            hours = hour;
            meridian = 'pm';
        } else {
            meridian ='am';
        }
        time[0] = hours;
        time[2] = time[2].split(' ').shift();
        let finalTime = time.join(':')+ ' '+meridian;
        return finalTime;
}

const ListOrders = (props) => {
    let table = <table className={classes.Table}>
                    <thead>
                        <th>S.NO</th>
                        <th>Qty</th>
                        <th>USERNAME</th>
                        <th>CREATED-ON</th>
                        <th>SHIPPED-ON</th>
                        <th>DELIVERED-ON</th>
                        <th></th>
                    </thead>
                    {
                        props.ordersArr.map( (list,index) => {
                            let createdAtDate = new Date(list.createdAt);
                            let shippedAtDate = <td>-</td>;
                            let deliveredAtDate = <td>-</td>;
                            if(list.shippedAt){
                                shippedAtDate = new Date(list.shippedAt);
                                shippedAtDate = <td>
                                                    {shippedAtDate.toDateString()}
                                                    <br/>
                                                    {timeConvertion(shippedAtDate)}
                                                </td>
                            }
                            if(list.deliveredAt){
                                deliveredAtDate = new Date(list.deliveredAt);
                                deliveredAtDate = <td>
                                                    {deliveredAtDate.toDateString()}
                                                    <br/>
                                                    {timeConvertion(deliveredAtDate)}
                                                </td>
                            }
                            return <tr key={list.orderId}>
                                        <td>{index+1}</td>
                                        <td>{list.itemQuantity}</td>
                                        <td>{list.userName}</td>
                                        <td>
                                            {createdAtDate.toDateString()}
                                            <br/>
                                            {timeConvertion(createdAtDate)}
                                        </td>
                                            {shippedAtDate}
                                        {deliveredAtDate}
                                        <td>
                                            <Link to={`/admin/orders/${props.type}/${list.cartId}/${list.orderId}`} className={classes.Link}>View Order</Link>
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