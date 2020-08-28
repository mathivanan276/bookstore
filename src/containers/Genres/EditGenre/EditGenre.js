import React, { Component } from 'react';
import Axios from 'axios';
import { Redirect,Link } from 'react-router-dom';

import classes from './EditGenre.module.css';
import Input from '../../../components/UI/form/input/Input';
import Button from '../../../components/UI/form/button/button';
import * as genreActionTypes from '../../../store/actions/genreAction';
import { connect } from 'react-redux';
import Spinner from '../../../components/UI/spinner/Spinner';

class EditGenre extends Component {

    state = {
        editform : {
            genre : {
                elementType: "input",
                elementConfig:{
                    placeholder: "genre NAME",
                    type:"text"
                },
                value : '',
                validation:{
                    required: true
                },
                touched: false,
                isvalid: true,
                name:"title"
            }
        },
        genreNameErr:'',
        error:false,
        updating:true
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
        if(this.state.editform.genre.isvalid && this.state.editform.genre.touched){
            const data={
                genreName:this.state.editform.genre.value
            }
            // console.log(data);
            const token = JSON.parse(localStorage.getItem('userDetails')).token;
            Axios({ 
                method:'post',
                url : 'genres/edit/'+this.props.match.params.genreId,
                data:data,
                headers: {'HTTP_AUTHORIZATION' : token }
            })
            .then(res => {
                console.log(res);
                if(res.data.response){
                    alert('Genre Edited');
                    this.props.getGenre();
                    this.props.history.goBack();
                    // this.props.history.push('/admin/genre');
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
    updating = () => {
        const updatedEditForm = {...this.state.editform};
        updatedEditForm.genre.value = this.props.genre.filter(data => data.genreId === this.props.match.params.genreId).pop().genreName;
        this.setState({
            ...this.state,
            editform: updatedEditForm,
            updating:false
        })
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
        if(this.props.genreLoading){
            return(
                <Spinner />
            )
        }
        if(!this.props.genreLoading && this.state.updating){
            this.updating();
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
                <h1>Add Genre</h1>
                {error}
                <form >
                    <div className={classes.Form}>
                    {form}
                    </div>
                    <Button type="submit" clicked={this.handleSubmit}>Edit genre</Button> 
                </form>
                <p>Add A Genre | <Link to='/admin/genre/add'><span className={classes.Link}>Click Here</span></Link></p>
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        genre : state.genreReducer.genre,
        genreLoading : state.genreReducer.genreLoading,
        loggedIn : state.loginReducer.loggedIn
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getGenre : () => dispatch(genreActionTypes.getGenre())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditGenre);