import React,{ Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from '../../../components/UI/form/input/Input';
import Button from '../../../components/UI/form/button/button';
import classes from './UserLogin.module.css';
import * as actionType from '../../../store/actions';
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
                value : ""
            },
            password:{
                elementType: "input",
                elementConfig:{
                    placeholder: "PASSWORD",
                    type:"password"
                },
                value : ""
            }
        }
    }

    inputChangeHandeler = (event,identifier) =>{
        const updatedloginForm = {...this.state.loginForm};
        const updatedloginFormElement = {...updatedloginForm[identifier]};
        updatedloginFormElement.value = event.target.value;
        updatedloginForm[identifier] = updatedloginFormElement;
        // console.log(updatedloginFormElement)
        this.setState({
            loginForm:updatedloginForm
        })
    }

    handleLogin = () =>{
        const userdata = {
            password: this.state.loginForm.password.value,
            email: this.state.loginForm.email.value
        }
        axios.post('/users/login', userdata)
        .then( res => {
            if(res.data.id){
                this.props.login(res.data.id,res.data.name,res.data.email,res.data.role)
                // this.props.login();
                console.log(res);
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

        for(let key in this.state.loginForm){
            formElement.push({
                id : key,
                config : this.state.loginForm[key]
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
                    changed = {(event)=>this.inputChangeHandeler(event,formElement.id)} />
              ))}
          </form>  
        );

        return (
            <div className={classes.Container}>
                <h1>Sign In</h1>
                {form}
                <Button type="submit" clicked={this.handleLogin}>Sign In</Button> 
                <p>New User Sign Up |<Link to='/register'><span className={classes.Link}> Click Here</span> </Link></p>
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
        login: (id,username,email,role) => dispatch({type : actionType.LOGIN , data:{ id:id, username:username, email:email,role:role }})
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(UserLogin);