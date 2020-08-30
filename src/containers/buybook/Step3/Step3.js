import React from 'react';
import classes from './Step3.module.css';

export default function Step3(props) {
    let list = props.cart.map((data,index) => {
        return  <tr>
                    <td>{index+1}</td>    
                    <td>{data.title}</td>    
                    <td>{data.quantity}</td>    
                </tr>
    })
    return (
        <div className={classes.Section}>
            <h3>Select Payment Type</h3>
            <select defaultValue={props.paymentType} onChange={(event) => props.change(event.target.value)}>
                <option>Credit Card</option>
                <option>Debit Card</option>
                <option>Net Banking</option>
                <option>Cash On Delivery</option>
            </select>
            <div className={classes.Buttons}>
                <button type='button' onClick={props.Goback} className={classes.Back}>Back</button>
                <button type='button' className={classes.Next} onClick={props.placeorder}>Place Order</button>
            </div>
            <table className={classes.Table}>
                <tr>
                    <th>S.NO</th>
                    <th>TITLE</th>
                    <th>QTY</th>
                </tr>
                {list}
            </table>
        </div>
    )
}
