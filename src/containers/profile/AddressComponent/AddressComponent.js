import React from 'react';
import classes from './AddressComponent.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
const AddressComponent = (props) => {   
    let address = null;
    if(props.address.length > 1){
        address = props.address.map(address => {
            return <div className={classes.AddressCard} onClick={()=>props.edit(address.addressId)}>
                        <address>
                            {address.streetAddress}<br />
                            {address.district}<br/>
                            {address.state}<br/>
                            pin: {address.pin}
                        </address>
                    <p>Click To Edit</p>
                    </div>
        })
    } else if(props.address.length === 1){
        address =   <>
                    <div className={classes.AddressCard} onClick={()=>props.edit(props.address[0].addressId)}>
                        <address>
                            {props.address[0].streetAddress}<br />
                            {props.address[0].district}<br/>
                            {props.address[0].state}<br/>
                            pin: {props.address[0].pin}
                        </address>
                        <p>Click To Edit</p>
                    </div>
                    <div className={classes.AddressCard} style={{color:'#a4a4a4'}} onClick={props.add}>
                        <FontAwesomeIcon icon={faPlus} size="3x" />
                        <p>Add Address</p>
                    </div>
                    </>
    } else {
        address =   <>
                        <div className={classes.AddressCard} style={{color:'#a4a4a4'}} onClick={props.add}>
                            <FontAwesomeIcon icon={faPlus} size="3x" />
                            <p>Add Address</p>
                        </div>
                        <div className={classes.AddressCard} style={{color:'#a4a4a4'}} onClick={props.add}>
                            <FontAwesomeIcon icon={faPlus} size="3x" />
                            <p>Add Address</p>
                        </div>
                    </>
    }
    return (
        <div className={classes.Section}>
            <h3>Address</h3>
            <div className={classes.Address}>
                {address}
            </div>
        </div>
    )
}

export default AddressComponent;