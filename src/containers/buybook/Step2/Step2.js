import React, { Component } from 'react';
import classes from './Step2.module.css';
import { Redirect } from 'react-router-dom';
import Spinner from '../../../components/UI/spinner/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Axios from 'axios';
import * as cartActionTypes from '../../../store/actions/cartAction';
import { connect } from 'react-redux';

class Step2 extends Component {
    state = {
        quantity:'',
        updated:false,
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            quantity:event.target.value
        })
    }
    updateitems = (event,itemId) => {
        if(this.state.quantity > 0){
            let token = JSON.parse(localStorage.getItem('userDetails')).token
            Axios.post('items/update/'+itemId,{
                quantity:this.state.quantity
            },{
                headers:{'HTTP_AUTHORIZATION':token}
            })
            .then(res => {
                if(res.data.response === true){
                    this.props.getCart();
                }
            })
            .catch ( err => {
                console.log(err);
            })
        } else {
            this.setState({
                ...this.state,
                error: itemId
            })
        }
    }
    removeItem = (event, itemId) => {
        let token = JSON.parse(localStorage.getItem('userDetails')).token
            Axios.post('items/delete/'+itemId,{
                quantity:this.state.quantity
            },{
                headers:{'HTTP_AUTHORIZATION':token}
            })
            .then(res => {
                if(res.data.response === true){   
                    this.props.getCart();
                }
            })
            .catch ( err => {
                console.log(err);
            })
    }
    render() {
        if(this.props.cartLoading){
            return <div className={classes.Section}><Spinner /></div>
        }
        let itemsList = null;
        if(this.props.cart.length > 0){
            itemsList = this.props.cart.map( (data,index) => {
                return  <div className={classes.Bookcard}>
                            <div className={classes.Bookcover}>
                                <img src={data.url} alt='book Cover' width='100px' height='125px' />
                            </div> 
                            <div className={classes.Bookdetails}>
                                <h3>{data.title}</h3>
                                <p><span className={classes.Bold}>Author :</span>{data.authorName}</p>
                                <p><span className={classes.Bold}>Available Stock :</span>{data.stock}</p>
                                <div className={classes.Inputs}>
                                    <div className={classes.Updatebox}>  
                                        <input 
                                        type='number' 
                                        style={this.state.error === data.itemId ? {borderColor:'red'} : null} 
                                        placeholder={data.quantity} 
                                        onChange={this.handleChange}/>
                                        <span 
                                        className={classes.Icon} 
                                        style={this.state.error === data.itemId ? {borderColor:'red'} : null}
                                        onClick={(event) => this.updateitems(event,data.itemId)}>
                                            <FontAwesomeIcon icon={faPlus} size='1x' />
                                        </span>
                                    </div>
                                    <button onClick={(event) => this.removeItem(event,data.itemId)}>Remove</button>
                                </div>
                            </div>
                        </div>
            })
            } else {
                return <Redirect to='/cart' />
            }
            return (
                <div className={classes.Section}>
                    {itemsList}
                    <div>
                    <table className={classes.Table2}>
                        <tr>
                        <td>SUB-TOTAL</td>
                        <td>{this.props.cart[0].subTotal} <small><FontAwesomeIcon icon={faRupeeSign} /></small></td>
                        </tr>
                        <tr>
                            <td>SHIPPING-FEE</td>
                            <td>{this.props.cart[0].shippingCost} <small><FontAwesomeIcon icon={faRupeeSign} /></small></td>
                        </tr>
                        <tr>
                            <td>TOTAL</td>
                            <td>{this.props.cart[0].total} <small><FontAwesomeIcon icon={faRupeeSign} /></small></td>
                        </tr>
                    </table>
                    </div>
                    <div className={classes.Buttons}>
                        <button type='button' onClick={this.props.Goback} className={classes.Back}>Back</button>
                        <button type='button' onClick={this.props.next} className={classes.Next}>Next</button>
                    </div>
                </div>
            )
        }
    }

    const mapStateToProps = state => {
        return {
            carts : state.cartReducer.cart,
            cartLoading : state.cartReducer.cartLoading
        }
    }
    
    const mapDispatchToProps = dispatch => {
        return {
            getCart : () => dispatch(cartActionTypes.getCart())
        }
    }

    export default connect(mapStateToProps,mapDispatchToProps)(Step2);