import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as bookActionType from '../../../store/actions/bookAction';
import Bookcard from '../../../components/bookcard/Bookcard';
import Spinner from '../../../components/UI/spinner/Spinner';
import classes from './Home.module.css';
import SearchBox from '../../../components/searchbox/SearchBox';
import Sidebar from '../../../Sidebar/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

class Home extends Component {
    state = {
        searchText:'',
        isvalid:true,
        touched:false,
        sidebar:false
    }
    validate = (value) => {
        let isvalid = true;
        isvalid = value.trim(' ').length !== 0 && isvalid;
        return isvalid;
    }
    handleChange = (event) => {
        const updatedState = {...this.state};
        updatedState.searchText = event.target.value;
        updatedState.touched = true;
        updatedState.isvalid = this.validate(event.target.value);
        this.setState({
            ...updatedState
        })
    }
    handleSearch = () => {
        if(this.state.isvalid && this.state.touched){
            this.props.history.push('/search/'+this.state.searchText);
        }
    }
    componentDidMount(){
        this.props.getNewBooks();
    }
    viewBook = (bookId) => {
        this.props.history.push('/view/'+bookId);
    }
    sidebar = () => {
        this.setState({
            ...this.state,
            sidebar: !this.state.sidebar
        })
    }
    render() {
        if(this.props.role === 'admin'){
            return <Redirect to='/admin/home' />
        }
        if(this.props.newBooksLoading){
            return <div><Spinner /></div>
        }
        let list = null;
        if(this.props.newBooksLoading === false){
            list = this.props.newBooks.map( (book,index) => {
                return <Bookcard book={book} clicked={()=>this.viewBook(book.bookId)}/>
            })
        }
        return (
            <div className={classes.Section}>
                <Sidebar open={this.state.sidebar} close={this.sidebar}/>
                <div onClick={this.sidebar} className={classes.Sidebar}><FontAwesomeIcon icon={ faArrowCircleRight }/> categories</div>
                <div className={classes.Main}>
                    <SearchBox changed={this.handleChange} isvalid={this.state.isvalid} submit={this.handleSearch} value={this.state.searchText} isValid={this.state.isvalid} />
                    {list}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        role : state.loginReducer.userDetails.role,
        newBooks : state.bookReducer.newBooks,
        newBooksLoading : state.bookReducer.newBooksLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getNewBooks : () => dispatch(bookActionType.newArrivals())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);