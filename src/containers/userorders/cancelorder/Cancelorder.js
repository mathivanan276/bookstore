import React, { Component } from 'react';
import classes from './Cancelorder.module.css';
import { connect } from 'react-redux';
import * as orderSummaryAction from '../../../store/actions/orderSummaryAction';
import Spinner from '../../../components/UI/spinner/Spinner';
import { Redirect } from 'react-router-dom';

import Axios from 'axios';

class Cancelorder extends Component {

    state = {
        feedback:'',
        isvalid:true,
        istouched:false,
        error:false
    }

    componentDidMount(){
        this.props.getOrderSummary(this.props.match.params.cartId);
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            ...this.state,
            feedback:event.target.value,
            istouched:true
        })
    }

    handleSubmit = () => {
        if(this.state.istouched && this.state.feedback.trim(' ').length > 10){
        const token = JSON.parse(localStorage.getItem('userDetails')).token;
        Axios.post('/orders/cancelorder/'+this.props.match.params.cartId,{feedback:this.state.feedback},
            {
                headers:{'HTTP_AUTHORIZATION' : token}
            })
            .then( res => {
                if(res.data.response === true){
                    alert("Your order Cancelled")
                    this.props.history.goBack();
                }
            })
        } else {
            this.setState({
                ...this.state,
                error:true
            })
        }
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
        if(this.props.orderSummaryLoading){
            return  <div>
                        <Spinner />
                    </div>
        }
        let orderDetails = null;
        if(this.props.orderSummaryLoading === false){
            orderDetails =  <div>
                                <h3>Items</h3>
                                <table className={classes.Table}>
                                    <tr>
                                        <th>s.no</th>
                                        <th>title</th>
                                        <th>Qty</th>
                                    </tr>
                                    {
                                        this.props.orderSummary.items.map( (data,index) => {
                                            return  <tr key={data.title}>
                                                        <td>{index+1}</td>
                                                        <td>{data.title}</td>
                                                        <td>{data.quantity}</td>
                                                    </tr>
                                        })
                                    }
                                </table>
                            </div>
        }
        let error = null;
        if(this.state.error){
            error = <div style={{textAlign:'center'}}>
                        <p className={classes.Error}>Validation Failed <br/> Enter minimum 15 characters</p>
                    </div>  
        }
        return (
            <div className={classes.Section}>
                <h2>Do You Wish To Cancel</h2>
                {orderDetails}
                {error}
                <h3>Feedback</h3>
                <textarea rows='5' placeholder="Enter Feedback" onChange={this.handleChange}></textarea>
                <button onClick={this.handleSubmit}>Cancel Now</button>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        orderSummaryLoading : state.orderSummaryReducer.orderSummaryLoading,
        loggedIn : state.loginReducer.loggedIn,
        orderSummary: state.orderSummaryReducer.orderSummary
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getOrderSummary : (cartId) => dispatch(orderSummaryAction.getOrderSummary(cartId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cancelorder);