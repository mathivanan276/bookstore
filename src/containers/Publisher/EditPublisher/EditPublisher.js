import React, { Component } from 'react';
import Axios from 'axios';
import { Redirect,Link } from 'react-router-dom';

import classes from './EditPublisher.module.css';
import Input from '../../../components/UI/form/input/Input';
import Button from '../../../components/UI/form/button/button';
import * as publisherActionTypes from '../../../store/actions/publisherAction';

import { connect } from 'react-redux';
import Spinner from '../../../components/UI/spinner/Spinner';

class EditPublisher extends Component {

    state = {
        editform : {
            publisher : {
                elementType: "input",
                elementConfig:{
                    placeholder: "PUBLISHER NAME",
                    type:"text"
                },
                value :'',
                validation:{
                    required: true
                },
                touched: false,
                isvalid: true,
                name:"title"
            }
        },
        publisherNameErr:'',
        error:false,
        updating:true,
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
        if(this.state.editform.publisher.isvalid && this.state.editform.publisher.touched){
            const data={
                publisherName:this.state.editform.publisher.value
            }
            // console.log(data);
            const token = JSON.parse(localStorage.getItem('userDetails')).token;
            Axios({ 
                method:'post',
                url : 'publishers/edit/'+this.props.match.params.publisherId,
                data:data,
                headers: {'HTTP_AUTHORIZATION' : token }
            })
            .then(res => {
                console.log(res);
                if(res.data.response){
                    alert('publisher Edited');
                    this.props.getPublisher();
                    this.props.history.goBack();
                    // this.props.history.push('/admin/publisher');
                } else {
                    this.setState({
                        publisherNameErr: res.data.dataErr
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
    updating = () => {
        const updatedEditform = {...this.state.editform};
        updatedEditform.publisher.value =  this.props.publisher.filter(data => data.publisherId === this.props.match.params.publisherId).pop().publisherName;
        this.setState({
            ...this.state,
            editform: updatedEditform,
            updating:false
        })
    }
    componentDidMount(){
        this.props.getPublisher();
    }
    render() {
        if(localStorage.getItem('userDetails') === null){
            return <Redirect to='/admin/login' />
        }
        if(JSON.parse(localStorage.getItem('userDetails')).role !== 'admin'){
            return <Redirect to='/admin/login' />
        }
        if(this.props.publisherLoading){
            return(
                <Spinner />
            )
        }
        if(!this.props.publisherLoading && this.state.updating){
            this.updating();
        }
        let error = null;   
        if(this.state.error){
            error =  <div className={classes.Error}>
                        <p>Validation Failed </p>
                    </div>
        }
        if(this.state.publisherNameErr !== ''){
                error =  <div className={classes.Error}>
                            <p>{this.state.publisherNameErr}</p>
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
                <h1>Edit Publisher</h1>
                {error}
                <form >
                    <div className={classes.Form}>
                    {form}
                    </div>
                    <Button type="submit" clicked={this.handleSubmit}>Edit publisher</Button> 
                </form>
                <p>Add A publisher | <Link to='/admin/publisher/add'><span className={classes.Link}>Click Here</span></Link></p>
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

export default connect(mapStateToProps,mapDispatchToProps)(EditPublisher);