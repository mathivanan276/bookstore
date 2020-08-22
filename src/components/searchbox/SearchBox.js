import React from 'react';
import classes from './SearchBox.module.css';

export default function SearchBox(props) {
    return (
        <div className={classes.SearchBar}>
            <form> 
                <input 
                    autoComplete='off'
                    type='text' 
                    name='searchbox' 
                    placeholder='title,Author,Isbn '
                    style={props.isvalid? null :{border:'1px solid red'}} 
                    className={classes.Input} 
                    value={props.value}
                    onChange={props.changed}  />
                <button type='button' onClick={props.submit}>search</button>
            </form>
        </div>
    )
}
