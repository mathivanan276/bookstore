import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as bookActionsType from '../../store/actions/bookAction';
import classes from './Viewbook.module.css';

class Viewbook extends Component {
    componentDidMount(){
        this.props.getBooks(this.props.match.params.bookId);
    }
    render() {
        if(this.props.book.title === 'getting'){
            return (
                <div>
                <p className={classes.Loading}>loading....</p>
                </div>
            )
        }
        return (
            <div className={classes.Section}>
                <div>
                    <img src={this.props.book.imageUrl} 
                    alt={this.props.book.title}  
                    className={classes.Cover} 
                    width='150px' 
                    height='200px'/>
                </div>
                <div className={classes.Title}>
                    <h1>{this.props.book.title}</h1>
                </div>
                <div className={classes.BookDetails}>
                    <div className={classes.BookSpecs}>
                        <table>
                            <tbody>
                                <tr>
                                    <td className={classes.Spec}>Author</td>
                                    <td>{this.props.book.authorName}</td>
                                </tr>
                                <tr>
                                    <td className={classes.Spec}>Publisher</td>
                                    <td>{this.props.book.publisherName}</td>
                                </tr>
                                <tr>
                                    <td className={classes.Spec}>ISBN</td>
                                    <td>{this.props.book.isbn}</td>
                                </tr>
                                <tr>
                                    <td className={classes.Spec}>Published On</td>
                                    <td>{this.props.book.publishedOn}</td>
                                </tr>
                                <tr>
                                    <td className={classes.Spec}>Language</td>
                                    <td>{this.props.book.language}</td>
                                </tr>
                                <tr>
                                    <td className={classes.Spec}>Price</td>
                                    <td>{this.props.book.price}</td>
                                </tr>
                                <tr>
                                    <td className={classes.Spec}>Genre</td>
                                    <td>{this.props.book.genreName}</td>
                                </tr>
                                <tr>
                                    <td className={classes.Spec}>Returnable</td>
                                    <td>{this.props.book.returnable}</td>
                                </tr>
                            </tbody>
                        </table>
                        <p className={classes.Spec}>Description</p>
                        <p className={classes.Description}>{this.props.book.description}</p>
                    </div>
                </div>
                <div className={classes.EditBook}>
                    <Link to={'/admin/book/edit/'+this.props.match.params.bookId}
                    className={classes.Button}>
                    Edit Book</Link>
                </div>
                <div className={classes.EditCover}>
                    <Link to={'/admin/book/cover/'+this.props.match.params.bookId}
                    className={classes.EditCoverButton}>
                    Add | Change Book Cover</Link>
                </div>
                <div className={classes.EditCover}>
                    <Link to={'/admin/book/stock/'+this.props.match.params.bookId+'/'+this.props.book.stock}
                    className={classes.EditCoverButton}>
                    Update Stock</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        book : state.bookReducer.book
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getBooks : (bookId) => dispatch(bookActionsType.getBook(bookId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Viewbook);