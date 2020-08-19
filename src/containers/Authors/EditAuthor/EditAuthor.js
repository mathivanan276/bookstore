import React, { Component } from 'react';
import Axios from 'axios';
import { Redirect,Link } from 'react-router-dom';

import classes from './EditAuthor.module.css';
import Input from '../../../components/UI/form/input/Input';
import Button from '../../../components/UI/form/button/button';

import { connect } from 'react-redux';

class EditAuthor extends Component {

    state = {
        editform : {
            author : {
                elementType: "input",
                elementConfig:{
                    placeholder: "AUTHOR NAME",
                    type:"text"
                },
                value : this.props.authorName[this.props.match.params.authorIndex].authorName,
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

    // formValidation = () => {
    //     let validating = false;
    //     let formElement = [];
    //     for(let key in this.state.addform){
    //         formElement.push({
    //             id : key,
    //             config : this.state.addform[key]
    //         })
    //     }
    //     validating = formElement.map( element => {
    //         if(element.config.touched && element.config.isvalid){
    //             return true;
    //         }else{
    //             return false;
    //         }
    //     })
    //     return validating.pop();
    // }  
    
    inputChangeHandeler = (event,identifier) =>{        
        const updatedAddForm = {...this.state.editform};
        const updatedAddFormElement = {...updatedAddForm[identifier]};
        updatedAddFormElement.value = event.target.value;
        updatedAddFormElement.touched = true;
        updatedAddFormElement.isvalid = this.checkValidation(updatedAddFormElement.value , updatedAddFormElement.validation);
        updatedAddForm[identifier] = updatedAddFormElement;
        // console.log(updatedAddForm)
        this.setState({
            editform:updatedAddForm
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.editform.author.isvalid && this.state.editform.author.touched){
            const data={
                authorName:this.state.editform.author.value
            }
            // console.log(data);
            const token = JSON.parse(localStorage.getItem('userDetails')).token;
            Axios({
                method: 'post',
                url:'authors/edit/'+this.props.authorName[this.props.match.params.authorIndex].authorId,
                data: data,
                headers: {'HTTP_AUTHORIZATION' : token }
            })
            .then(res => {
                // console.log(res);
                if(res.data.response){
                    alert('Author Edited');
                    this.props.history.push('/admin/author');
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
        if(this.props.loggedIn){
            const adminData = JSON.parse(localStorage.getItem('userDetails')).role;
            if(adminData !== 'admin'){
                return <Redirect to='/admin/login' />
            }
        } else {
            return <Redirect to='/home' />
        }
        if(this.props.authorName[0].id === 1){
            return(
                <Redirect to='/admin/author/home' />
            )
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

        for(let key in this.state.editform){
            formElement.push({
                id : key,
                config : this.state.editform[key]
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
                    <Button type="submit" clicked={this.handleSubmit}>Edit Author</Button> 
                </form>
                <p>Add A Author | <Link to='/admin/author/add'><span className={classes.Link}>Click Here</span></Link></p>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        authorName : state.authorReducer.authors,
        loggedIn : state.loginReducer.loggedIn
    }
}

export default connect(mapStateToProps)(EditAuthor);