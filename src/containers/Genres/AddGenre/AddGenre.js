import React, { Component } from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

import classes from './AddGenre.module.css';
import Input from '../../../components/UI/form/input/Input';
import Button from '../../../components/UI/form/button/button';
import {connect} from 'react-redux';
import * as genreActionTypes from '../../../store/actions/genreAction';

class AddGenre extends Component {

    state = {
        addform : {
            genre : {
                elementType: "input",
                elementConfig:{
                    placeholder: "GENRE NAME",
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
        genreNameErr:'',
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
        event.preventDefault();
        if(this.state.addform.genre.isvalid && this.state.addform.genre.touched){
            const data={
                genreName:this.state.addform.genre.value
            }
            // console.log(data);
            const token = JSON.parse(localStorage.getItem('userDetails')).token;
            Axios({
                method: 'post',
                url:'genres/add',
                data:data,
                headers: {'HTTP_AUTHORIZATION' : token }
            })
            .then(res => {
                // console.log(res);
                if(res.data.response){
                    alert('Genre Added');
                    this.props.getGenre();
                    this.props.history.push('/admin/genre');
                } else {
                    this.setState({
                        genreNameErr: res.data.dataErr
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

    componentDidMount(){
        this.props.getGenre();
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
        if(this.state.genreNameErr !== ''){
                error =  <div className={classes.Error}>
                            <p>{this.state.genreNameErr}</p>
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
                <h1>Add Genre</h1>
                {error}
                <form >
                    <div className={classes.Form}>
                    {form}
                    </div>
                    <Button type="submit" clicked={this.handleSubmit}>Add Genre</Button> 
                </form>
                <p>To Edit genre Search a genre manually and edit</p>
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        loggedIn : state.loginReducer.loggedIn
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getGenre : () => dispatch(genreActionTypes.getGenre())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddGenre);