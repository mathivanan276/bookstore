import React from 'react'

import classes from './input.module.css';

const Input = (props) => {

    let inputElement = null;

    const inputClasses = [classes.Input];

    if(!props.isvalid){
        inputClasses.push(classes.Invalid);
        // console.log('Invalid')
    }
    
    switch(props.elementType){
        case ('input') : 
            inputElement = <input 
                            className={inputClasses.join(' ')} 
                            {...props.elementConfig}
                            value={props.value}
                            onChange={props.changed}
                            />;
            break;
        case ('textarea') : 
        inputElement = <textarea
                        rows='3'
                        className={inputClasses.join(' ')}
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed}></textarea>;
        break;

        case ('select') : 
        inputElement = <select
                className={inputClasses.join(' ')}
                onChange={props.changed}>
                    {
                        props.elementConfig.options.map(options =>{
                            return <option key={options.value} value={options.value}>{options.dispVal}</option>
                        })
                    }
                </select>
        break;

        case ('radio') :
            inputElement = <input 
                className={inputClasses.join(' ')}
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
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );

}

export default Input;