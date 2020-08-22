import React, { Component } from 'react';
import SearchBox from '../../components/searchbox/SearchBox';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './AuthorControl.module.css';
import * as authorActionTypes from '../../store/actions/authorAction';
import Spinner from '../../components/UI/spinner/Spinner';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


class AuthorControl extends Component {
    state = {
        searchText:'',
        isvalid:true,
        istouched:false
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
    }
    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.isvalid && this.state.isTouched){
            
        } else {
            this.setState({
                error: true
            })
        }
    }
    componentDidMount(){
        this.props.getAuthors();
    }
    render() {
        if(this.props.loggedIn){
            const adminData = JSON.parse(localStorage.getItem('userDetails')).role;
            if(adminData !== 'admin'){
                return <Redirect to='/admin/login' />
            }
        } else {
            return <Redirect to='/home' />
        }
        let suggestion = null;
        if(this.props.authorLoading){
            suggestion = <div>
                        <Spinner />
                    </div>
        }
        let refreshedAuthor =   this.props.authors.filter((author)=> {
                                    return author.authorName.toLowerCase().includes(this.state.searchText.toLowerCase());
                                });
        if(this.state.searchText.length > 3 && refreshedAuthor.length > 0){
                suggestion =    <table className={classes.Table}>
                                    <tr>
                                        <th>S.NO</th>
                                        <th>AUTHOR NAME</th>
                                    </tr>
                                    {
                                        refreshedAuthor.map( (author,index) => {
                                            return  <tr>
                                                        <td>{index+1}</td>
                                                        <td key={author.authorId}>
                                                            {author.authorName}
                                                        </td>
                                                        <td><Link to={'/admin/author/edit/'+author.authorId}>Edit</Link></td>
                                                    </tr>
                                        })
                                    }
                                </table>
        }
        return (
            <div className={classes.Greetings}>
                <h2>Search Author Name</h2>
               {/* <SearchBox changed={this.handleChange} submit={this.handleSubmit} value={this.state.searchText} isvalid={this.state.isvalid} /> */}
               <input 
                value={this.state.searchText}
                onChange={this.handleChange} 
                placeholder='Enter Author Name'
                />
                <div>
                    <Link to='/admin/author/add' className={classes.Link}>Add New Author</Link>
                </div> 
               <div className={classes.Suggestion}>
                   {suggestion}
               </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        loggedIn : state.loginReducer.loggedIn,
        authors : state.authorReducer.authors,
        authorLoading : state.authorReducer.authorLoading,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getAuthors : () => dispatch(authorActionTypes.getAuthors())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AuthorControl);