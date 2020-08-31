import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import classes from './NotFound.module.css';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className={classes.Section}>
            <h1>404 - Not Found</h1>
            <h4>Requested Page Is Not Found</h4>
            <p><Link to='/home'>Go <FontAwesomeIcon icon={ faHome } size='2x' /></Link></p>
        </div>
    )
}
