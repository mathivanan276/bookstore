import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as genreActionTypes from '../../store/actions/genreAction';

import Spinner from '../../components/UI/spinner/Spinner';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import classes from './GenreControl.module.css';

class GenreControl extends Component {
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
    componentDidMount(){
        this.props.getGenre();
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
        if(this.props.genreLoading){
            suggestion = <div>
                        <Spinner />
                    </div>
        }
        let refreshedGenre =   this.props.genre.filter((gerne)=> {
                                    return gerne.genreName.toLowerCase().includes(this.state.searchText.toLowerCase());
                                });
        if(this.state.searchText.length > 3 && refreshedGenre.length > 0){
                suggestion =    <table className={classes.Table}>
                                    <tr>
                                        <th>S.NO</th>
                                        <th>GENRE NAME</th>
                                    </tr>
                                    {
                                        refreshedGenre.map( (genre,index) => {
                                            return  <tr>
                                                        <td>{index+1}</td>
                                                        <td key={genre.genreId}>
                                                            {genre.genreName}
                                                        </td>
                                                        <td><Link to={'/admin/genre/edit/'+genre.genreId}>Edit</Link></td>
                                                    </tr>
                                        })
                                    }
                                </table>
        }
        return (
            <div className={classes.Greetings}>
                <h2>Search Genre Name</h2>
               {/* <SearchBox changed={this.handleChange} submit={this.handleSubmit} value={this.state.searchText} isvalid={this.state.isvalid} /> */}
               <input 
                value={this.state.searchText}
                onChange={this.handleChange} 
                placeholder='Enter Genre Name'
                />
                <div>
                    <Link to='/admin/genre/add' className={classes.Link}>Add New Genre</Link>
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
        genre : state.genreReducer.genre,
        genreLoading : state.genreReducer.genreLoading,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getGenre : () => dispatch(genreActionTypes.getGenre())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(GenreControl);   