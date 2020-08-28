import React from 'react';
import { Link } from "react-router-dom";

import classes from './Suggestion.module.css';

export default function Suggestion(props) {
    if(props.show !== false){
        return null;
    }
    let link = null;
    if(props.filteredSuggestions.length === 0 && props.userInput !== ''){
        link = <li><Link to={props.linkto} >Add New {props.name}</Link></li>
    }
    return (
        <React.Fragment>
            <ul className={classes.Suggestion} style={props.show ? {display:'none'} : null}>
                {/* <li>
                    <Link to={props.linkto} >Add New {props.name}</Link>
                </li> */}
                {
                    props.filteredSuggestions.map( (data,index) => {
                        if(index > 5){
                            return null;
                        }
                        if(data.id === props.defaultValue){
                            return  <li key={data.id} onClick={props.selected(data.id,data.value,props.name)}>
                                        {data.value}
                                    </li>
                        }
                        return  <li key={data.id} onClick={()=>props.selected(data.id,data.value,props.name)}>
                                    {data.value}
                                </li>
                    })
                }
                {link}
            </ul>
        </React.Fragment>
    )
}
