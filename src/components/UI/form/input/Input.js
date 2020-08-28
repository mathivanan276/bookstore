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
            inputElement = /*<div className={classes.FormControl}>*/
                            <input 
                            className={inputClasses.join(' ')} 
                            {...props.elementConfig}
                            value={props.value}
                            onChange={props.changed}
                            disabled={props.show}
                            />
                            //</div>;
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
        inputElement = <div className={classes.FormControl}>
                    <label>{props.label}</label>
                    <select
                    className={classes.Input}
                    onChange={props.changed}
                    defaultValue={props.value}>
                        <option key=" " value="--null--">--null--</option>
                        {
                            props.elementConfig.options.map((options,index) =>{
                                return <option key={index} value={options.value}>{options.dispVal}</option>
                            })
                        }
                    </select>
                </div>
        break;

        case ('radio') :
            inputElement = <>
                    {
                        props.elementConfig.buttons.map( (option,index) => {
                            return <React.Fragment key={index}>
                                <label key={option.label} className={classes.Label}>{option.label}</label>
                                <input key={index} type='radio' value={option.value} name={option.name} checked={option.value === props.value} className={classes.Input} onChange={props.changed}/>
                            </React.Fragment>
                        })
                    }
                </>;
                break;
        default: 
        inputElement = null;
    }

    return (
        <>
            {inputElement}
        </>
    );

}

export default Input;