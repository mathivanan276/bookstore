import React from 'react';
import classes from './Modal.module.css';

export default function Modal(props) {
    if(props.open){
        return (
            <div className={classes.Modal}>
                <div className={classes.BackDrop} onClick={props.click}></div>
                <div className={classes.Body}>
                    {props.children}
                </div>
            </div>
        )
    } else {
        return null;
    }

}
