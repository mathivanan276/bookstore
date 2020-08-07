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
                value : ""
            },
            email:{
                elementType: "input",
                elementConfig:{
                    placeholder: "EMAIL",
                    type:"email"
                },
                value : ""
            },
            password:{
                elementType: "input",
                elementConfig:{
                    placeholder: "PASSWORD",
                    type:"password"
                },
                value : ""
            },
            confirmPassword : {
                elementType: "input",
                elementConfig:{
                    placeholder: "CONFIRM PASSWORD",
                    type:"password"
                },
                value : ""
            }
        }
    }

    inputChangeHandeler = (event,identifier) =>{
        const updatedregisterForm = {...this.state.registerForm};
        const updatedregisterFormElement = {...updatedregisterForm[identifier]};
        updatedregisterFormElement.value = event.target.value;
        updatedregisterForm[identifier] = updatedregisterFormElement;
        // console.log(updatedregisterFormElement)
        this.setState({
            registerForm:updatedregisterForm
        })
    }

    handleRegister = () =>{
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
    }

    render(){
        if(this.props.islogged === true){
            return <Redirect to="/" />
        }
        const formElement = [];

        for(let key in this.state.registerForm){
            formElement.push({
                id : key,
                config : this.state.registerForm[key]
            })
        }

        const form = (
          <form>
              { formElement.map(formElement => (
                <Input 
                    key={formElement.id}
                    elementType = {formElement.config.elementType}
                    elementConfig = {formElement.config.elementConfig}
                    value = {formElement.config.value}
                    changed = {(event)=>this.inputChangeHandeler(event,formElement.id)}  />
              ))}
          </form>  
        );

        return (
            <div className={classes.Container}>
                <h1>Register</h1>
                {form}
                <Button type="submit" clicked={this.handleRegister}>Register</Button> 
                <p>Already Have An Accont |<Link to='/login'><span className={classes.Link}> Sign In</span> </Link></p>
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