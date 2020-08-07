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
                className={classes.Input}
                onChange={props.changed}>
                    {
                        props.elementConfig.options.map(options =>{
                            return <option key={options.value} value={options.value}>{options.dispVal}</option>
                        })
                    }
                </select>
        break;

        case ('radio') :
            inputElement = <div>
                <label className={classes.Label}>{props.label}</label>
                <input 
                className={classes.Radio}
                type={props.elementType}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
                </div>;
                break;
        default: 
        inputElement = <input />
    }

    return (
        <div className={classes.FormControl}>
            {inputElement}
        </div>
    );

}

export default Input;