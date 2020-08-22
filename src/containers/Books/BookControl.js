import React, { Component } from 'react'

import classes from './BookControl.module.css';
import { connect } from 'react-redux';

import * as bookActionTypes from '../../store/actions/bookAction';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Spinner from '../../components/UI/spinner/Spinner';
import SearchBox from '../../components/searchbox/SearchBox';
import Bookcard from '../../components/bookcard/Bookcard';

class BookControl extends Component {
    state = {
        searchText : '',
        isvalid:true,
        isTouched:false
    }

    checkvalidity = (value) => {
        let isvalid = true;
        isvalid = value.trim(' ').length >= 3 && isvalid;
        return isvalid;
    }

    handleChange = (event) => {
        const updatedState = {...this.state};
        updatedState.searchText = event.target.value;
        updatedState.isvalid = this.checkvalidity(event.target.value);
        updatedState.isTouched = true;
        this.setState({
            ...updatedState
        })
        if(event.target.value.length > 3 ){
            this.handleSubmit();
        } 
    }
    handleSubmit = (event) => {
        if(this.state.isvalid && this.state.isTouched){
            this.props.searchBook(this.state.searchText);
        } else {
            this.setState({
                error: true
            })
        }
    }
    viewBook = (event,bookId) => {
        this.props.history.push('/admin/book/view/'+bookId);
    }

    render(){
        if(this.props.loggedIn){
            const adminData = JSON.parse(localStorage.getItem('userDetails')).role;
            if(adminData !== 'admin'){
                return <Redirect to='/admin/login' />
            }
        } else {
            return <Redirect to='/home' />
        }
        let book = null;
        if(this.props.searchedBooksLoading){
            book = <div>
                        <Spinner />
                    </div>
        }
        if(!this.props.searchedBookLoading){
            if(this.props.searchedBooks.length > 0){
                book = this.props.searchedBooks.map((book,index) => {
                                return <Bookcard book={book} key={book.title} clicked={(event) => this.viewBook(event,book.bookId)} />
                            })   
            } else {
                book = <p>No Books Found</p>
            }
        }
        return (
            <div className={classes.Greetings}> 
                <SearchBox changed={this.handleChange} submit={this.handleSubmit} value={this.state.searchText} isvalid={this.state.isvalid} />
                <div className={classes.Link}>
                    <Link to='/admin/book/add' className={classes.Link}>Add New Book</Link>
                </div> 
                <div className={classes.Books}>
                    {book}
                </div>
            </div>
        )
    }
    
}

const mapStateToProps = (state) =>{
    return {
        loggedIn : state.loginReducer.loggedIn,
        searchedBooks : state.bookReducer.searchedBooks,
        searchedBookLoading : state.bookReducer.searchedBooksLoading
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        searchBook : (keyword) => dispatch(bookActionTypes.searchbook(keyword))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BookControl);