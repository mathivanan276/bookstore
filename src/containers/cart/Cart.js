import React, { Component } from 'react';
import classes from './Cart.module.css';
import { connect } from 'react-redux';
import * as cartActionTypes from '../../store/actions/cartAction';
import { Redirect } from 'react-router-dom';
import Spinner from '../../components/UI/spinner/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Axios from 'axios';

class Cart extends Component {
    
    state = {
        quantity:''
    }

    componentDidMount(){
        this.props.getCart();
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
                    window.location.reload(false);
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
                    window.location.reload(false);
                }
            })
            .catch ( err => {
                console.log(err);
            })
    }
    render() {
        if(localStorage.getItem('userDetails') === null){
            return <Redirect to='/login' />
        }
        if(JSON.parse(localStorage.getItem('userDetails')).role === 'admin'){
            return <Redirect to='/login' />
        }
        let itemsList = null;
        let buy = null;
        if(this.props.cartLoading){
            itemsList = <div className={classes.Section}>
                            <Spinner />
                        </div>
        }
        if(this.props.cartLoading === false){
            if(this.props.carts.length > 0){
                itemsList = this.props.carts.map( data => {
                    return  <div className={classes.Bookcard} key={data.title}>
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
                buy =   <div style={{margin:'2rem'}}><Link to='/buy'>Buy Now</Link></div>
            }
            else {
                itemsList = <div className={classes.Empty}>
                                <h2>Cart Empty</h2>
                                <Link to='/home'>
                                    <p><FontAwesomeIcon icon={faCartPlus} size='5x' /></p>
                                    Buy Some Books
                                </Link>
                            </div>
            }
        }
        return (
            <div className={classes.Section}>
                {itemsList}
                {buy}
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

export default connect(mapStateToProps,mapDispatchToProps)(Cart);