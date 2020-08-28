import React, { Component } from 'react';
import Input from '../../../components/UI/form/input/Input';
import Button from '../../../components/UI/form/button/button';
import {Redirect } from 'react-router-dom';

import classes from './Stock.module.css';
import Axios from 'axios';
import { connect } from 'react-redux';

class Stock extends Component {
    state = {
        stock : {
            elementType: "input",
            elementConfig:{
                placeholder: "QUANTITY",
                type:"number"
            },
            value : this.props.match.params.quantity,
            validation:{
                required: true,
                maxvalue: 20,
                isNumber: true
            },
            touched: false,
            isvalid: true,
            name:"title"
        },
        error : false,
        loading : true
    }

    checkValidity = (value,rule) => {
        let isvalid = true;
        if(!rule){
            isvalid = true;
        }
        if(rule.required){
            isvalid = value !== '' ? true : false && isvalid;
        }
        if(rule.maxvalue){
            isvalid = value >= rule.maxvalue ? true : false && isvalid;
        }
        if(rule.isNumber){
            const pattern = /^\d+$/;
            isvalid = pattern.test(value) && isvalid;
        }
        return isvalid;
    }

    inputChangeHandeler = (event) => {
        const updatedStock = {...this.state.stock};
        updatedStock.isvalid = this.checkValidity(event.target.value,updatedStock.validation); 
        updatedStock.touched = true;
        updatedStock.value = event.target.value;
        this.setState({
            ...this.state,
            stock : updatedStock
        })

    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            ...this.state,
            loading : true
        })
        if(this.state.stock.value !== '' && this.state.stock.isvalid){
            const token = JSON.parse(localStorage.getItem('userDetails')).token;
            Axios.post('/books/changestock/'+this.props.match.params.bookId,{quantity:this.state.stock.value},{
                headers:{'HTTP_AUTHORIZATION' : token}
            })
            .then(res => {
                // console.log(res);
                if(res.data.response === true){
                    this.setState({
                        ...this.state,
                        loading : false
                    })
                    alert('quatity updated');
                    this.props.history.push('/admin/book');
                }
            })
            .catch( err => {
                this.setState({
                    ...this.state,
                    loading : false
                })
                console.log(err);
            })
        } else {
            this.setState({
                ...this.state,
                error:true,
                loading:false
            })
        }
    }
    render() {
        if(localStorage.getItem('userDetails') === null){
            return <Redirect to='/admin/login' />
        }
        if(JSON.parse(localStorage.getItem('userDetails')).role !== 'admin'){
            return <Redirect to='/admin/login' />
        }
        let error = null;
        if(this.state.error){
            error =  <div className={classes.Error}>
                        <p>Validation Failed </p>
                    </div>
        }
        return (
            <div className={classes.Main}>
            <div className={classes.Section}>
                <h1>Update Stock</h1>
                {error}
                <form >
                    <div className={classes.Form}>
                    <Input 
                    elementType = {this.state.stock.elementType}
                    elementConfig = {this.state.stock.elementConfig}
                    value = {this.state.stock.value}
                    isvalid = {this.state.stock.isvalid}
                    label = {this.state.stock.label}
                    changed = {(event)=>this.inputChangeHandeler(event)} />
                    </div>
                    <Button type="submit" clicked={this.handleSubmit}>Update</Button> 
                </form>
            </div>
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        loggedIn : state.loginReducer.loggedIn
    }
}

export default connect(mapStateToProps)(Stock);