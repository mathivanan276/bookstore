import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as bookActionType from '../../store/actions/bookAction';
import Spinner from '../../components/UI/spinner/Spinner';
import Bookcard from '../../components/bookcard/Bookcard';
import classes from './Search.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

class Search extends Component {
    componentDidMount(){
        this.props.getSearch(this.props.match.params.searchKey);
    }
    render() {
        if(this.props.booksLoading){
            return <div><Spinner /></div>
        }
        let list = null;
        if(this.props.booksLoading === false){
            if(this.props.books.length > 0){
                list = this.props.books.map( book => {
                    return <Bookcard book={book} clicked={()=>this.props.history.push('/view/'+book.bookId) }/>
                })
            } else {
                list =  <div>
                            <h2>No Books Found</h2>
                            <Link to='/home' ><h4>Go <FontAwesomeIcon icon={faHome} size='2x' /></h4></Link>
                        </div>
            } 
        }
        return (
            <div className={classes.Section}>
                {list}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        books : state.bookReducer.searchedBooks,
        booksLoading : state.bookReducer.searchedBooksLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSearch : (searchKey) => dispatch(bookActionType.searchbook(searchKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
