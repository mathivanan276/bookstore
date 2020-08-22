import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as publisherActionTypes from '../../store/actions/publisherAction';

import Spinner from '../../components/UI/spinner/Spinner';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import classes from './PublisherControl.module.css';

class PublisherControl extends Component {
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
        this.props.getPublisher();
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
        if(this.props.publisherLoading){
            suggestion = <div>
                        <Spinner />
                    </div>
        }
        let refreshedPublisher =   this.props.publisher.filter((publisher)=> {
                                    return publisher.publisherName.toLowerCase().includes(this.state.searchText.toLowerCase());
                                });
        if(this.state.searchText.length > 3 && refreshedPublisher.length > 0){
                suggestion =    <table className={classes.Table}>
                                    <tr>
                                        <th>S.NO</th>
                                        <th>PUBLISHER NAME</th>
                                    </tr>
                                    {
                                        refreshedPublisher.map( (publisher,index) => {
                                            return  <tr>
                                                        <td>{index+1}</td>
                                                        <td key={publisher.publisherId}>
                                                            {publisher.publisherName}
                                                        </td>
                                                        <td><Link to={'/admin/publisher/edit/'+publisher.publisherId}>Edit</Link></td>
                                                    </tr>
                                        })
                                    }
                                </table>
        }
        return (
            <div className={classes.Greetings}>
                <h2>Search Publisher Name</h2>
               {/* <SearchBox changed={this.handleChange} submit={this.handleSubmit} value={this.state.searchText} isvalid={this.state.isvalid} /> */}
               <input 
                value={this.state.searchText}
                onChange={this.handleChange} 
                placeholder='Enter Publisher Name'
                />
                <div>
                    <Link to='/admin/publisher/add' className={classes.Link}>Add New Publisher</Link>
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
        publisher : state.publisherReducer.publisher,
        publisherLoading : state.publisherReducer.publisherLoading,
        loggedIn : state.loginReducer.loggedIn
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getPublisher : () => dispatch(publisherActionTypes.getPublisher())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PublisherControl);