import React, { Component } from 'react';
import classes from './EditAddress.module.css';
import { connect } from 'react-redux';
import Axios from 'axios';

import Button from '../../../components/UI/form/button/button';
import * as addressActionTypes from '../../../store/actions/addressAction';
import Spinner from '../../../components/UI/spinner/Spinner';

class EditAddress extends Component {
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

    updating = (address) => {
        const updatedState = {...this.state};
        const updatedAddressForm = {...updatedState.addressForm};
        updatedAddressForm['street'].value = address.streetAddress;
        updatedAddressForm['district'].value = address.district;
        updatedAddressForm['state'].value = address.state;
        updatedAddressForm['pin'].value = address.pin;
        updatedState.updating=false;
        // console.log(address);
        this.setState({
            ...updatedState
        })
    }
    componentDidMount(){
        this.props.getAddress();
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
            Axios.post('address/edit/'+this.props.match.params.addressId,{
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
    render() {
        let error = null;   
        if(this.state.error){
            error =  <div className={classes.Error}>
                        <p>Validation Error</p>
                    </div>
        }
        if(!this.props.addressLoading && this.state.updating){
            const address = this.props.address.map(address => {
                // console.log(this.props.match.params.addressId)
                // console.log(address.addressId);
                if(address.addressId === this.props.match.params.addressId){
                    // console.log(address);
                    this.updating(address);
                    return address;
                }
            });
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
        return (
            <div>
                <div className={classes.Section}>
                    <h3>Edit Address</h3>
                    {error}
                    {form}
                    <Button clicked={this.handleSubmit}>Edit</Button>
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

export default connect(mapStateToProps,mapDispatchToProps)(EditAddress);