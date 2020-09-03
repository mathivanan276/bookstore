import React from 'react';

import classes from './Footer.module.css';

const Footer = () => {
    return(
        <div className={classes.Footer}>
            <p>Copyright &copy; 2020 Tamilnadu-BookStore.Pvt Ltd</p>
            <p>Powered By : <a href='https://about.techmathi.tk'>techmathi</a></p>
        </div>
    );
}

export default Footer;