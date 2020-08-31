import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import classes from './Placeorder.module.css';
import * as cartActionTypes from '../../store/actions/cartAction';
import * as addressActionTypes from '../../store/actions/addressAction';
import Step1 from './Step1/Step1';
import Spinner from '../../components/UI/spinner/Spinner';
import Step2 from './Step2/Step2';
import Step3 from './Step3/Step3';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Model from '../../components/UI/model/Modal';

class Placeorder extends Component {

    state = {
        addressId:'',
        address:{
            streetAddress : '',
            district:'',
            state:'',
            pin:''
        },
        addressError:false,
        paymentType:'Credit Card',
        currentStep:1,
        selected:'select',
        success: false,
        model: false
    }

    componentDidMount(){
        this.props.getCart();
        this.props.getAddress();
    }

    handleAddressChange = (addressId,address) => {
        if(addressId){
            this.setState({
                ...this.state,
                addressId,
                selected:'select',
                address:{
                    streetAddress : '',
                    district:'',
                    state:'',
                    pin:''
                },
                currentStep:2
            })
        } else {
            this.setState({
                ...this.state,
                selected:'form',
                address,
                addressId:'',
                currentStep:2
            })
        }
    }
    handlePayment = (paymentType) => {
        this.setState({
            ...this.state,
            paymentType
        })
    }
    goBack = (step) => {
        this.setState({
            ...this.state,
            currentStep: step
        })
    }
    goNext = (step) => {
        this.setState({
            ...this.state,
            currentStep: step
        })
    }
    handlePlacement = () => {
        let data = {
            cartId : this.props.carts[0].cartId,
            paymentType: this.state.paymentType,
            address: this.state.address,
            addressId: this.state.addressId
        }
        if(this.state.paymentType !== ''){
            let token = JSON.parse(localStorage.getItem('userDetails')).token;
            Axios.post('orders/placeorder',data,{
                headers:{'HTTP_AUTHORIZATION':token}
            })
            .then ( res => {
                if(res.data.response === true){
                    this.setState({
                        success: true,
                        model: true
                    })
                } else {
                    this.setState({
                        success: false
                    })
                }
            })
        } else {

        }
    }
    render() {
        if(localStorage.getItem('userDetails') === null){
            return <Redirect to='/login' />
        }
        if(JSON.parse(localStorage.getItem('userDetails')).role === 'admin'){
            return <Redirect to='/login' />
        }
        if(this.props.addressLoading && this.props.cartLoading){
            return <div><Spinner /></div>
        }
        let currentStep =null;
        if(this.props.addressLoading === false && this.props.cartLoading === false){
            if(this.props.carts.length === 0){
                return <Redirect to='/cart' />
            } 
            switch(this.state.currentStep){
                case 1 : 
                    currentStep = <Step1 
                                    addresses={this.props.address} 
                                    addressId={this.state.addressId} 
                                    address={this.state.address} 
                                    Goback={this.props.history.goBack} 
                                    type={this.state.selected} 
                                    changed={this.handleAddressChange} />;
                    break;
                case 2 : 
                    currentStep = <Step2 cart={this.props.carts} Goback={()=>this.goBack(1)} next={() => this.goNext(3)} />;
                    break;
                case 3 : 
                    currentStep = <Step3 cart={this.props.carts} paymentType={this.state.paymentType} change={this.handlePayment} Goback={()=>this.goBack(2)} placeorder={this.handlePlacement} />;
                    break;
        }
        }
        let model = null;
        if(this.state.success && this.state.model){
            model =     <Model open={this.state.model}>
                            <div className={classes.Success}>
                                <h1>Success</h1>
                                <div className={classes.Link}><Link to='/home' >Continue Shopping</Link></div>
                            </div>
                        </Model>
        }
        return (
            <>
            <div className={classes.StepBar}>
                <div className={classes.Step1} style={this.state.currentStep >= 1 ? {backgroundColor: '#FFEB3B'} : null } ></div>
                <div className={classes.Step2} style={this.state.currentStep >= 2 ? {backgroundColor: '#FFEB3B'} : null }></div>
                <div className={classes.Step3} style={this.state.currentStep >= 3 ? {backgroundColor: '#FFEB3B'} : null }></div>
            </div>
            <div className={classes.Section}>
                {model}
                {currentStep}
            </div>
            </> 
        )
    }
}

const mapStateToProps = state => {
    return {
        carts : state.cartReducer.cart,
        cartLoading : state.cartReducer.cartLoading,
        address : state.addressReducer.address,
        addressLoading : state.addressReducer.addressLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCart : () => dispatch(cartActionTypes.getCart()),
        getAddress : () => dispatch(addressActionTypes.getAddress())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Placeorder);