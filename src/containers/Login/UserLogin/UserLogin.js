import React,{ Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from '../../../components/UI/form/input/Input';
import Button from '../../../components/UI/form/button/button';
import classes from './UserLogin.module.css';
import * as actionType from '../../../store/actions/loginActions';
import axios from 'axios';

class UserLogin extends Component {

    state = {
        loginForm : {
            // name : {
            //     elementType: "input",
            //     elementConfig:{
            //         placeholder: "USERNAME",
            //         type:"text"
            //     },
            //     value : ""
            // },
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
                    minLength: 6,
                    content: 'password'
                },
                touched: false,
                isvalid: true,
            }
        },
        error: false,
        emailErr : '',
        passwordErr : '',
        loginErr: false
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
        for(let key in this.state.loginForm){
            formElement.push({
                id : key,
                config : this.state.loginForm[key]
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
        const updatedloginForm = {...this.state.loginForm};
        const updatedloginFormElement = {...updatedloginForm[identifier]};
        updatedloginFormElement.value = event.target.value;
        updatedloginFormElement.touched = true;
        updatedloginFormElement.isvalid = this.checkValidation(updatedloginFormElement.value , updatedloginFormElement.validation);
        updatedloginForm[identifier] = updatedloginFormElement;
        // console.log(updatedloginFormElement)
        this.setState({
            loginForm:updatedloginForm
        })
    }

    handleLogin = (event) =>{
        event.preventDefault();
        if(this.formValidation()){
            const userdata = {
                password: this.state.loginForm.password.value,
                email: this.state.loginForm.email.value
            }
            // alert('succes')
            axios.post('/users/login', userdata)
            .then( res => {
                console.log(res);
                if(res.data.id){
                    this.props.login(res.data.id,res.data.name,res.data.email,res.data.role)
                } else {
                    // const updatedState = {...this.state};
                    // updatedState['loginErr'] = true;
                    // updatedState['emailErr'] = res.data.emailErr;
                    // updatedState['passwordErr'] =res.data.passwordErr;
                    this.setState({
                        loginErr:true,
                        emailErr : res.data.emailErr,
                        passwordErr : res.data.passwordErr
                    })
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
        if(this.state.loginErr){
            if(this.state.emailErr !== ''){
                error =  <div className={classes.Error}>
                            <p>{this.state.emailErr}</p>
                        </div>
            }else{
                error =  <div className={classes.Error}>
                            <p>{this.state.passwordErr}</p>
                        </div>  
            }
        }
        const formElement = [];

        for(let key in this.state.loginForm){
            formElement.push({
                id : key,
                config : this.state.loginForm[key]
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
                    changed = {(event)=>this.inputChangeHandeler(event,formElement.id)} />
              ))
        );

        return (
            <div className={classes.Main}>
            <div className={classes.Container}>
                <h1>Sign In</h1>
                {error}
                <form onSubmit={this.handleLogin}>
                    {form}
                    <Button type="submit" clicked={this.handleLogin}>Sign In</Button> 
                </form>
                <p>New User Sign Up |<Link to='/register'><span className={classes.Link}> Click Here</span> </Link></p>
                <p>Sign In | Admin |<Link to='/admin/login'><span className={classes.Link}> Click Here</span> </Link></p>
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

const mapDispatchToProps = dispatch => {
    return {
        login: (id,username,email,role) => dispatch(actionType.userlogin(id,username,email,role)) // data:{ id:id, username:username, email:email,role:role }})
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(UserLogin);