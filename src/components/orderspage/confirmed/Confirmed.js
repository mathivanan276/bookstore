import React from 'react';

import classes from './Confirmed.module.css';

const Confirmed = (props) => {
    
    return (
        <div className={classes.Section}>
            <h3>Order Summery</h3>
            <table>

            </table>
            <table>
                <tr>
                <td>SUB-TOTAL</td>
                <td></td>
                </tr>
                <tr>
                    <td>SHIPPING-FEE</td>
                    <td></td>
                </tr>
                <tr>
                    <td>TOTAL</td>
                    <td></td>
                </tr>
            </table>
        </div>
    )
}

export default Confirmed;