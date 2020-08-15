import React, { Component } from 'react';
import { Link,Redirect,withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

import Input from '../../components/UI/form/input/Input';
import Button from '../../components/UI/form/button/button';
import classes from './UserRegister.module.css';

class UserRegister extends Component {

    state = {
        registerForm : {
            name : {
                elementType: "input",
                elementConfig:{
                    placeholder: "USERNAME",
                    type:"text"
                },
                value : "",
                validation:{
                    required: true
                },
                touched: false,
                isvalid: true
            },
            email:{
                elementType: "input",
                elementConfig:{
                    placeholder: "EMAIL",
                    type:"email"
                },
                value : "",
                validation:{
                    required: true,
                    isEmail:true
                },
                touched: false,
                isvalid: true
            },
            password:{
                elementType: "input",
                elementConfig:{
                    placeholder: "PASSWORD",
                    type:"password"
                },
                value : "",
                validation:{
                    required: true,
                    minLength:6
                },
                touched: false,
                isvalid: true
            },
            confirmPassword : {
                elementType: "input",
                elementConfig:{
                    placeholder: "CONFIRM PASSWORD",
                    type:"password"
                },
                value : "",
                validation:{
                    required: true,
                    minLength:6
                },
                touched: false,
                isvalid: true
            }
        },
        error: false
    }

    checkValidation = (value, rule) =>{
        let isvalid = true;

        if(!rule){
            isvalid = true;
        }

        if(rule.required){
            isvalid = value.trim(' ') !== '' && isvalid;
        }

        if(rule.minLength){
            isvalid = value.length >= rule.minLength && isvalid;
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

    formValidation = () => {
        let validating = false;
        let formElement = [];
        for(let key in this.state.registerForm){
            formElement.push({
                id : key,
                config : this.state.registerForm[key]
            })
        }
        validating = formElement.map( element => {
            if(element.config.touched && element.config.isvalid){
                return true;
            }else{
                return false;
            }
        })
        return validating.pop();
    }  

    inputChangeHandeler = (event,identifier) =>{
        // console.log(identifier);
        const updatedregisterForm = {...this.state.registerForm};
        const updatedregisterFormElement = {...updatedregisterForm[identifier]};
        updatedregisterFormElement.value = event.target.value;
        updatedregisterFormElement.touched = true;
        updatedregisterFormElement.isvalid = this.checkValidation(updatedregisterFormElement.value , updatedregisterFormElement.validation);
        updatedregisterForm[identifier] = updatedregisterFormElement;
        // console.log(updatedregisterFormElement);
        this.setState({
            registerForm:updatedregisterForm
        })
    }

    handleRegister = (event) =>{
        event.preventDefault();
        if(this.formValidation()){
            const userdata = {
                name: this.state.registerForm.name.value,
                password: this.state.registerForm.password.value,
                confirmPassword: this.state.registerForm.confirmPassword.value,
                email: this.state.registerForm.email.value
            }
            axios.post('/users/register', userdata)
            .then( res => {
                if(res.data.success === true){
                    alert('Registered Successfully');
                    this.props.history.push('/login');
                }
                else {
                    alert('Something Went Wrong');
                    console.log(res.data.error);
                }
            })
            .catch( err => {
                console.log(err);
            })
        } else {
            this.setState({
                error: true
            })
        }
    }

    render(){
        if(this.props.islogged === true){
            return <Redirect to="/" />
        }
        let error = null;   
        if(this.state.error){
            error =  <div className={classes.Error}>
                        <p>Validation Failed </p>
                    </div>
        }
        const formElement = [];

        for(let key in this.state.registerForm){
            formElement.push({
                id : key,
                config : this.state.registerForm[key]
            })
        }

        const form = (
                formElement.map(formElement => (
                <Input 
                    key={formElement.id}
                    elementType = {formElement.config.elementType}
                    elementConfig = {formElement.config.elementConfig}
                    value = {formElement.config.value}
                    isvalid = {formElement.config.isvalid}
                    changed = {(event)=>this.inputChangeHandeler(event,formElement.id)}  />
              ))
        );

        return (
            <div className={classes.Main}>
            <div className={classes.Container}>
                <h1>Register</h1>
                {error}
                <form>
                    {form}
                    <Button type="submit" clicked={this.handleRegister}>Register</Button> 
                </form>
                <p>Already Have An Accont |<Link to='/login'><span className={classes.Link}> Sign In</span> </Link></p>
            </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        islogged : state.loginReducer.loggedIn
    }
}

export default connect(mapStateToProps)(withRouter(UserRegister)) ;