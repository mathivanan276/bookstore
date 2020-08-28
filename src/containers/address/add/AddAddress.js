import React, { Component } from 'react';
import classes from './AddAddress.module.css';
import { connect } from 'react-redux';

import Axios from 'axios';
import Button from '../../../components/UI/form/button/button';
import * as addressActionTypes from '../../../store/actions/addressAction';
import Spinner from '../../../components/UI/spinner/Spinner';
import { Redirect } from 'react-router-dom';

class AddAddress extends Component {
    state = {
        addressForm : {
            street:{
                elementType:'input',
                elementConfig:{
                    placeholder:'',
                    type:'text',
                    name:'street'
                }, 
                validation:{
                    required: true,
                    address: true
                },
                touched : true,
                isvalid : true,
                value: ''
            },
            district:{
                elementType:'input',
                elementConfig:{
                    placeholder:'',
                    type:'text',
                    name:'district'
                }, 
                validation:{
                    required: true,
                },
                touched : true,
                isvalid : true,
                value: ''
            },
            state:{
                elementType:'input',
                elementConfig:{
                    placeholder:'',
                    type:'text',
                    name:'state'
                }, 
                validation:{
                    required: true,
                },
                touched : true,
                isvalid : true,
                value: ''
            },
            pin:{
                elementType:'input',
                elementConfig:{
                    placeholder:'',
                    type:'text',
                    name:'pin'
                }, 
                validation:{
                    required: true,
                    minLength: 6,
                    maxLength:8
                },
                touched : true,
                isvalid : true,
                value: ''
            }
        },
        updating: true,
        error:false
    }
    handleChange = (event,name) => {
        const updatedAddressForm = {...this.state.addressForm};
        updatedAddressForm[name].value = event.target.value;
        updatedAddressForm[name].isvalid = this.checkValidity(event.target.value,updatedAddressForm[name].validation);
        this.setState({
            ...this.state,
            addressForm:updatedAddressForm
        })
    }
    checkValidity = (value,rule) => {
        let isvalid = true;
        if(rule.required){
            isvalid = value.trim(' ') !== '' && isvalid;
        }
        if(rule.name){
            const pattern = /^[A-Za-z]+$/;
            isvalid = pattern.test(value) && isvalid;
        }
        if(rule.minLength){
            isvalid = value.length >= rule.minLength && isvalid;
        }
        if(rule.maxLength){
            isvalid = value.length <= rule.maxLength && isvalid;
        }
        return isvalid;
    }
    formvalid = () => {
        let validating = false;
        let formElement = [];
        for(let key in this.state.addressForm){
            formElement.push({
                config : this.state.addressForm[key]
            })
        }
        validating = formElement.map( element => {
            if(element.config.touched && element.config.isvalid){
                return true;
            }else{
                return false;
            }
        })
        return validating.filter(data => data === false);
    }
    handleSubmit = () => {
        if(this.formvalid().length === 0){
            const token = JSON.parse(localStorage.getItem('userDetails')).token;
            Axios.post('address/add',{
                    streetAddress:this.state.addressForm.street.value,
                    district: this.state.addressForm.district.value,
                    state: this.state.addressForm.state.value,
                    pin: this.state.addressForm.pin.value
            },{
                headers:{'HTTP_AUTHORIZATION' : token}
            })
            .then(res => {
                console.log(res.data)
                if(res.data.response === true) {
                    // window.location.reload(true);
                    this.props.history.push('/profile')
                }
            })
            .catch(err => {
                console.log(err);
            })
        } else{
            this.setState({
                ...this.state,
                error:true
            })
        }
    }
    componentDidMount(){
        this.props.getAddress();
    }
    render() {
        if(localStorage.getItem('userDetails') === null){
            return <Redirect to='/login' />
        }
        if(JSON.parse(localStorage.getItem('userDetails')).role === 'admin'){
            return <Redirect to='/login' />
        }
        let error = null;   
        if(this.state.error){
            error =  <div className={classes.Error}>
                        <p>Validation Error</p>
                    </div>
        }
        const formElement = [];
        let form = null;
        for(let key in this.state.addressForm){
            formElement.push({
                id: key,
                elementConfig : this.state.addressForm[key].elementConfig,
                value : this.state.addressForm[key].value,
                isvalid : this.state.addressForm[key].isvalid
            })
        }
        form = formElement.map(data => {
            return <div key={data.id}>
                <label>{data.id.toUpperCase()} <span style={{color:'red'}}>*</span></label>
                <input 
                style={ !data.isvalid ? {border:'2px solid red'} : null}
                type={data.elementType}  
                {...data.elementConfig}
                value={data.value}
                onChange={(event)=>this.handleChange(event,data.id)} />
            </div>
        })
        if(this.props.addressLoading){
            form =  <div>
                        <Spinner />
                    </div>
        }
        if(!this.props.addressLoading){
            if(this.props.address.length === 2){
                return <Redirect to='/profile' />
            }
        }
        return (
            <div>
                <div className={classes.Section}>
                    <h3>Add Address</h3>
                    {error}
                    {form}
                    <Button clicked={this.handleSubmit}>Add</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        address:state.addressReducer.address,
        addressLoading : state.addressReducer.addressLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAddress : () => dispatch(addressActionTypes.getAddress())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddAddress);