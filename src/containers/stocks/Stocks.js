import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as bookActionTypes from '../../store/actions/bookAction';

import classes from './Stocks.module.css';
import Input from '../../components/UI/form/input/Input';
import Axios from 'axios';
import SearchUpdate from './Search/SearchUpdate';

class Stocks extends Component {

    state = {
        stock : {
            elementType: "input",
            elementConfig:{
                placeholder: "QUANTITY",
                type:"number"
            },
            value : '',
            validation:{
                required: true,
                minSize : 20
            },
            touched: false,
            isvalid: true,
            name:"title"
        },
        error : false,
        updated :false,
    }
    checkValidity = (value,rule) => {
        let isvalid = true;
        if(!rule){
            isvalid = true;
        }
        if(rule.required){
            isvalid = value !== ' ' ? true : false && isvalid;
        }
        if(rule.minSize){
            isvalid = value >= rule.minSize ? true : false && isvalid;
        }
        // console.log(isvalid)
        return isvalid;
    }
    handleSubmit = (event,bookId) => {
        event.preventDefault();
        if(this.state.stock.isvalid && this.state.stock.touched){
            Axios.post('/books/changestock/'+bookId,{quantity : this.state.stock.value})
            .then( res => {
                window.location.reload(false);
            })
            .catch( err => {
                console.log(err);
            })
        } else {
            this.setState({
                error:true
            })
        }
    }
    handleChange = (event) => {
        const updatedStock = {...this.state.stock};
        updatedStock.isvalid = this.checkValidity(event.target.value,updatedStock.validation); 
        updatedStock.touched = true;
        updatedStock.value = event.target.value;
        this.setState({
            ...this.state,
            stock : updatedStock
        })
    }
    componentDidMount(){
        this.props.getlowstock();
    }
    render() {
        let loading = null;    
        if( this.props.lowstock !== 'loading' && this.props.lowstock.count === 0){
            loading = (
                <div className={classes.Section}>
                   <h3>All Stocks Are Good Enough</h3> 
                </div>
            )
        }
        if(this.props.lowstock !== 'loading' && this.props.lowstock.count !== 0){
            loading = (
                <div className={classes.Section}>
                <table className={classes.Table}>
                    <tr>
                        <th>S.NO</th>
                        <th>BOOK ID</th>
                        <th>TITLE</th>
                        <th>QUANTITY</th>
                        <th></th>   
                    </tr>
                    {this.props.lowstock.data.map( (data,index) => {
                        return (
                            <tr key={data.bookId}>
                                <td>{index + 1}</td>
                                <td>{data.bookId}</td>
                                <td>{data.title}</td>
                                <td><Input 
                                     elementType = {this.state.stock.elementType}
                                     elementConfig = {{placeholder:data.quantity,type:'number'}}
                                     value = {this.state.stock.value}
                                     isvalid = {this.state.stock.isvalid}
                                     label = {this.state.stock.label}
                                     changed = {(event)=>this.handleChange(event)} /></td>
                                <td><p onClick={(event)=>this.handleSubmit(event,data.bookId)}>Update</p></td>
                            </tr>
                        )
                    })}
                </table>
                </div>
            )
        }
        if(this.props.lowstock === 'loading'){
            loading = (
                <div className={classes.Section}>
                    loding...
                </div>
            )
        }
        return (
            <div className={classes.Container}>
                <SearchUpdate />
                {loading}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        lowstock : state.bookReducer.lowStock
    }
}

const mapDispatchToProps = (dispatch) => {
    return({
        getlowstock : () => dispatch(bookActionTypes.getLowStockBooks())
    }
    );
}
export default connect(mapStateToProps,mapDispatchToProps)(Stocks);