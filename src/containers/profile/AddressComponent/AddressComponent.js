import React from 'react';
import classes from './AddressComponent.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faPlus } from '@fortawesome/free-solid-svg-icons';
const AddressComponent = (props) => {    
    return (
        <div className={classes.Section}>
            <h3>Address</h3>
            <div className={classes.Address}>
                <div className={classes.AddressCard}>
                    <address>
                        4/246,Mahesh Mess<br />
                        Othakuthirai <br/>
                        GobiChettypalayam(P.O)<br/> Erode(D.T)<br />
                        pin: 638455
                    </address>
                </div>
                <div className={classes.AddressCard} style={{color:'#a4a4a4'}}>
                    <FontAwesomeIcon icon={faPlus} size="3x" />
                    <p>Add Address</p>
                </div>
            </div>
        </div>
    )
}

export default AddressComponent;