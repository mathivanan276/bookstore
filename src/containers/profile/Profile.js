import React, { Component } from 'react';
import classes from './Profile.module.css';
import ProfileInfoView from './profileComponents/ProfileInfoView';
import AddressComponent from './AddressComponent/AddressComponent';
import { connect } from 'react-redux';
import * as personalInfoActionTypes from '../../store/actions/personalInfoAction';
import * as addressActionTypes from '../../store/actions/addressAction';
import Spinner from '../../components/UI/spinner/Spinner';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

class Profile extends Component {
    state = {
        profileForm : {
            firstName:{
                elementType:'input',
                elementConfig:{
                    placeholder:'',
                    type:'text'
                }, 
                validation:{
                    required: true,
                    name:true
                },
                touched : true,
                isvalid : true,
                value: ''
            },
            lastName:{
                elementType:'input',
                elementConfig:{
                    placeholder:'',
                    type:'text'
                }, 
                validation:{
                    required: true,
                    name:true
                },
                touched : true,
                isvalid : true,
                value: ''
            },
            mobile:{
                elementType:'input',
                elementConfig:{
                    placeholder:'',
                    type:'number'
                }, 
                validation:{
                    required: true,
                    minLength: 10,
                    maxLength: 15
                },
                touched : true,
                isvalid : true,
                value: ''
            }
        },
        loading:true,
        error:false,
        spinner:false
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
    handleChange = (event,name) => {
        const updatedProfileForm = {...this.state.profileForm};
        updatedProfileForm[name].value = event.target.value;
        updatedProfileForm[name].isvalid = this.checkValidity(event.target.value,updatedProfileForm[name].validation);
        this.setState({
            ...this.state,
            profileForm: updatedProfileForm,
            loading:false
        })
    }
    formvalid = () => {
        let validating = false;
        let formElement = [];
        for(let key in this.state.profileForm){
            formElement.push({
                config : this.state.profileForm[key]
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
           const data = {
               firstName : this.state.profileForm.firstName.value,
               lastName : this.state.profileForm.lastName.value,
               mobile : this.state.profileForm.mobile.value
           }
           this.setState({
               ...this.state,
               spinner:true
           })
            let token = JSON.parse(localStorage.getItem('userDetails')).token;
            Axios.post('/personaldetails/edit',data,{headers:{'HTTP_AUTHORIZATION':token}})
            .then( res => {
                if(res.data.response === true){
                    window.location.reload(false);
                    this.setState({
                        ...this.state,
                        spinner:false
                    })
                } else {
                    this.setState({
                        ...this.state,
                        error:true
                    })
                }
            })
       }
    }
    componentDidMount(){
        this.props.getPersonalInfo();
        this.props.getAddress();
    }
    updating = () => {
        const updatedForm = {...this.state.profileForm};
        updatedForm.firstName.value = this.props.personalInfo.firstName;
        updatedForm.lastName.value = this.props.personalInfo.lastName;
        updatedForm.mobile.value = this.props.personalInfo.mobile;
        this.setState({
            ...this.state,
            profileForm:updatedForm,
            loading:false
        })
    }
    editAddress = (addressId) => {
        this.props.history.push('/address/edit/'+addressId);
    }
    addAddress = () => {
        this.props.history.push('/address/add');
    }
    render() {
        if(this.props.loggedIn){
            if(localStorage.getItem('userDetails') === null){
                return <Redirect to='/login' />
            }
            if(JSON.parse(localStorage.getItem('userDetails')).role === 'admin'){
                return <Redirect to='/login' />
            }
        }else {
            return <Redirect to='/home' />
        }
        
        if(this.state.spinner){
            return(
                <div className={classes.Section}>
                <Spinner />
                </div>
            );
        }
        if(this.props.personalInfoLoading && this.props.addressLoading){
            return(
                <div className={classes.Section}>
                    <Spinner />
                </div>
            );
        }
        if(this.state.loading && !this.props.personalInfoLoading && !this.props.addressLoading){
            this.updating();
        }
        return (
            <div className={classes.Section}>
                <ProfileInfoView profileForm={this.state.profileForm} changed={this.handleChange} error={this.state.error} submitted={this.handleSubmit} />
                <AddressComponent address={this.props.address} edit={this.editAddress} add={this.addAddress} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        personalInfo : state.personalInfoReducer.personalInfo,
        personalInfoLoading : state.personalInfoReducer.personalInfoLoading,
        userDetails : state.loginReducer.userDetails,
        loggedIn : state.loginReducer.loggedIn,
        address : state.addressReducer.address,
        addressLoading : state.addressReducer.addressLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        getPersonalInfo : () => dispatch(personalInfoActionTypes.getPersonalInfo()),
        getAddress : () => dispatch(addressActionTypes.getAddress())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile);