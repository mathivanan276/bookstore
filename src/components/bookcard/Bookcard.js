import React from 'react';
import classes from './Bookcard.module.css';

export default function Bookcard(props) {
    return (
        <div className={classes.Bookcard} onClick={props.clicked}>
            <div className={classes.Bookcover}>
                <img src={props.book.coverUrl} alt='book Cover' width='100px' height='125px' />
            </div> 
            <div className={classes.Bookdetails}>
                <h3>{props.book.title}</h3>
                <p><span className={classes.Bold}>Author :</span>{props.book.authorName}</p>
                <p><span className={classes.Bold}>Genre :</span>{props.book.genreName}</p>
                <p><span className={classes.Bold}>Publisher :</span>{props.book.publisherName}</p>
                <p><span className={classes.Bold}>Price :</span> Rs.{props.book.price}</p>
            </div>
        </div>
    )
}
