import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as bookActionTypes from '../../store/actions/bookAction';
import { Redirect } from 'react-router-dom';

import classes from './Stocks.module.css';
import Axios from 'axios';
import SearchUpdate from './Search/SearchUpdate';

class Stocks extends Component {

    state = {
        quantity:'',
        error : false,
        updated :false,
    }
    checkValidity = (value,rule) => {
        let isvalid = true;
        if(!rule){
            isvalid = true;
        }
        if(rule.required){
            isvalid = value !== ' ' ? true : false && isvalid;
        }
        if(rule.minSize){
            isvalid = value >= rule.minSize ? true : false && isvalid;
        }
        // console.log(isvalid)
        return isvalid;
    }
    handleSubmit = (event,bookId) => {
        event.preventDefault();
        if(this.state.quantity > 20){
            Axios.post('/books/changestock/'+bookId,{quantity : this.state.stock.value})
            .then( res => {
                window.location.reload(false);
            })
            .catch( err => {
                console.log(err);
            })
        } else {
            this.setState({
                error:true
            })
        }
    }
    handleChange = (event) => {
        const [name,value] = event.target;
        this.setState({
            [name] : value
        })
       
    }
    componentDidMount(){
        this.props.getlowstock();
    }
    render() {
        const adminData = JSON.parse(localStorage.getItem('adminDetails'));
        if(!adminData){
            return <Redirect to='/admin/login' />
        }
        let loading = null;    
        if( this.props.lowstock !== 'loading' && this.props.lowstock.count === 0){
            loading = (
                <div className={classes.Section}>
                   <h3>All Stocks Are Good Enough</h3> 
                </div>
            )
        }
        if(this.props.lowstock !== 'loading' && this.props.lowstock.count !== 0){
            loading = (
                <div className={classes.Section}>
                <table className={classes.Table}>
                    <thead>
                        <tr>
                            <th>S.NO</th>
                            <th>BOOK ID</th>
                            <th>TITLE</th>
                            <th>QUANTITY(>20)</th>
                            <th></th>
                        </tr>   
                    </thead>
                    {this.props.lowstock.data.map( (data,index) => {
                        return (
                            <tr key={data.bookId}>
                                <td>{index + 1}</td>
                                <td>{data.bookId}</td>
                                <td>{data.title}</td>
                                <td><input
                                     placeholder={data.quantity}
                                     value={this.state.value}
                                     name='quantity'
                                     type='number' 
                                     changed = {(event)=>this.handleChange(event)} /></td>
                                <td><p onClick={(event)=>this.handleSubmit(event,data.bookId)}>Update</p></td>
                            </tr>
                        )
                    })}
                </table>
                </div>
            )
        }
        if(this.props.lowstock === 'loading'){
            loading = (
                <div className={classes.Section}>
                    loding...
                </div>
            )
        }
        return (
            <div className={classes.Container}>
                <SearchUpdate />
                {loading}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        lowstock : state.bookReducer.lowStock
    }
}

const mapDispatchToProps = (dispatch) => {
    return({
        getlowstock : () => dispatch(bookActionTypes.getLowStockBooks())
    }
    );
}
export default connect(mapStateToProps,mapDispatchToProps)(Stocks);