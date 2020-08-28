import React, { Component } from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

import classes from './AddAuthor.module.css';
import Input from '../../../components/UI/form/input/Input';
import Button from '../../../components/UI/form/button/button';
import { connect } from 'react-redux';
import * as authorActionTypes from '../../../store/actions/authorAction';
class AddAuthor extends Component {

    state = {
        addform : {
            author : {
                elementType: "input",
                elementConfig:{
                    placeholder: "AUTHOR NAME",
                    type:"text"
                },
                value : "",
                validation:{
                    required: true
                },
                touched: false,
                isvalid: true,
                name:"title"
            }
        },
        authorNameErr:'',
        error:false
    }
    checkValidation = (value, rule) =>{
        let isvalid = true;

        if(!rule){
            return isvalid = true;
        }

        if(rule.required){
            isvalid = value.trim(' ') !== '' && isvalid;
        }

        if(rule.minLength){
            isvalid = value.length >= rule.minLength && isvalid;
        }

        // console.log(value.length,rule.maxLength);   
        if(rule.maxLength){
            // console.log(value.length,rule.maxLength);
            isvalid = value.length < rule.maxLength && isvalid;
        }
        if (rule.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            // console.log(pattern.test(value),isvalid);
            isvalid = pattern.test(value) && isvalid;
        }

        if (rule.isNumeric) {
            const pattern = /^\d+$/;
            isvalid = pattern.test(value) && isvalid
        }
        return isvalid;
    }
    
    inputChangeHandeler = (event,identifier) =>{        
        const updatedAddForm = {...this.state.addform};
        const updatedAddFormElement = {...updatedAddForm[identifier]};
        updatedAddFormElement.value = event.target.value;
        updatedAddFormElement.touched = true;
        updatedAddFormElement.isvalid = this.checkValidation(updatedAddFormElement.value , updatedAddFormElement.validation);
        updatedAddForm[identifier] = updatedAddFormElement;
        // console.log(updatedAddForm)
        this.setState({
            addform:updatedAddForm
        })
    }

    handleSubmit = (event) => {
        // this.props.history.goBack();
        event.preventDefault();
        if(this.state.addform.author.isvalid && this.state.addform.author.touched){
            const data={
                authorName:this.state.addform.author.value
            }
            // console.log(data);
            const token = JSON.parse(localStorage.getItem('userDetails')).token;
            Axios({
                url:'/authors/add',
                method: 'post',
                data:data,
                headers: {'HTTP_AUTHORIZATION' : token }
            })
            .then(res => {
                // console.log(res);
                if(res.data.response === true){
                    alert('Author Added');
                    // this.props.history.push('/admin/author');
                    this.props.getAuthors();
                    this.props.history.goBack();
                } else {
                    this.setState({
                        authorNameErr: res.data.dataErr
                    });
                }
            })
            .catch(err => {
                console.log(err)
            })
        } else {
            this.setState({
                error: true
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
        if(this.state.authorNameErr !== ''){
                error =  <div className={classes.Error}>
                            <p>{this.state.authorNameErr}</p>
                        </div>
        }
        const formElement = [];

        for(let key in this.state.addform){
            formElement.push({
                id : key,
                config : this.state.addform[key]
            })
        }

        let form = (
                formElement.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType = {formElement.config.elementType}
                    elementConfig = {formElement.config.elementConfig}
                    value = {formElement.config.value}
                    isvalid = {formElement.config.isvalid}
                    label = {formElement.config.label}
                    changed = {(event)=>this.inputChangeHandeler(event,formElement.id)}  />
              ))
        );
        return (
            <div className={classes.Section}>
                <h1>Add Author</h1>
                {error}
                <form >
                    <div className={classes.Form}>
                    {form}
                    </div>
                    <Button type="submit" clicked={this.handleSubmit}>Add Author</Button> 
                </form>
                <p>To Edit Author Search a Author manually and edit</p>
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        loggedIn : state.loginReducer.loggedIn
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        getAuthors : () => dispatch(authorActionTypes.getAuthors())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddAuthor);