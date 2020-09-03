import React from 'react';

import classes from './Footer.module.css';

const Footer = () => {
    return(
        <div className={classes.Footer}>
            <p>Copyright &copy; 2020 Tamilnadu-BookStore.Pvt Ltd</p>
            <p>About Me : <a href='https://about.techmathi.tk'>about.techmathi.tk</a></p>
            <p><a href='mailto:mathivanan276@gmail.com' >mathivanan276@gmail.com</a></p>
        </div>
    );
}

export default Footer;