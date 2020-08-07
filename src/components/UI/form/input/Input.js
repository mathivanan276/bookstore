import React from 'react'

import classes from './input.module.css';

const Input = (props) => {

    let inputElement = null;
    
    switch(props.elementType){
        case ('input') : 
            inputElement = <input 
                            className={classes.Input} 
                            {...props.elementConfig}
                            value={props.value}
                            onChange={props.changed}
                            />;
            break;
        case ('textarea') : 
        inputElement = <textarea
                        rows='3'
                        className={classes.InputTextArea}
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed}></textarea>;
        break;

        case ('select') : 
        inputElement = <select
                className={classes.Input}
                onChange={props.changed}>
                    {
                        props.elementConfig.options.map(options =>{
                            return <option value={options.value}>{options.dispVal}</option>
                        })
                    }
                </select>
        break;

        case ('radio') :
            inputElement = <input 
                type={props.elementType}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
                break;
        default: 
        inputElement = <input />
    }

    return (
        <div className={classes.FormControl}>
            <label className={classes.Label}></label>
            {inputElement}
        </div>
    );

}

export default Input;