import React from 'react';

import classes from './button.module.css';

const button = (props) => {
   return <button type={props.type} className={classes.Button} onClick={props.clicked}>{props.children}</button>
};

export default button;