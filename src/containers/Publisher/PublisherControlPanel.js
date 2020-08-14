import React, { Component } from 'react';
import { Redirect,Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as publisherActionTypes from '../../store/actions/publisherAction';
import classes from './PublisherControlPanel.module.css';
import Input from '../../components/UI/form/input/Input';
import Button from '../../components/UI/form/button/button';

class PublisherControlPanel extends Component {

    state = {
            publisher : {
                elementType: "select",
                elementConfig:{
                    options: this.props.authors
                },
                value : "--null--",
                touched: false,
                isvalid: true,
                label:"Publisher"
            },
        error:false,
        updating:true
    }
    handleChange = (event) => {
        const updatedPublisherElement = {...this.state.publisher};
        updatedPublisherElement.value = event.target.value;
        updatedPublisherElement.touched = true;
        if(event.target.value === '--null--'){
            updatedPublisherElement.isvalid = false
            this.setState({
                error: true,
                publisher:updatedPublisherElement
            })
        } else {
            updatedPublisherElement.isvalid = true
            this.setState({
                error: false,
                publisher:updatedPublisherElement
            })
        }
    }

    updating = () => {
        const updatedPublisherElement = {...this.state.publisher};
        updatedPublisherElement.elementConfig.options = this.props.publisher.map((publisher,index) => {
            return {
                value: index,
                dispVal: publisher.publisherName
            }
        });
        this.setState({
            ...this.state,
            publisher:updatedPublisherElement,
            updating:false
        })
    }

    componentDidMount(){
        this.props.getPublisher();
    }
    handleSubmit = () => {
        if(this.state.publisher.value !== '--null--'){
            this.props.history.push('/admin/publisher/edit/'+this.state.publisher.value);
        } else {
            this.setState({
                error:true
            })
        }
    }
    render() {
        const adminData = JSON.parse(localStorage.getItem('adminDetails'));
        if(!adminData){
            return <Redirect to='/admin/login' />
        }
        let error = null;   
        if(this.state.error){
            error =  <div className={classes.Error}>
                        <p>Select Valid Publisher</p>
                    </div>
        }
        let form = null;

        form = (
            <form>
                <Input 
                elementType = {this.state.publisher.elementType}
                elementConfig = {this.state.publisher.elementConfig}
                value = {this.state.publisher.value}
                isvalid = {this.state.publisher.isvalid}
                changed = {(event)=>this.handleChange(event)}  />
                <div className={classes.Button}>
                    <Button type="button" clicked={this.handleSubmit}>Edit Publisher</Button> 
                </div> 
            </form>
        );

        if(this.props.publisher[0].id === 1){
            form = null;
            form = <p>Loding....</p>
        }
        if(this.props.publisher[0].id !== 1 && this.state.updating){
            this.updating();
        }
        return (
            <div className={classes.Greetings}>
                <h1>Select Publisher</h1>
                {error}
                <div className={classes.Forms}>
                    {form}
                </div> 
                <div>
                    <Link to='/admin/publisher/add' className={classes.Link}>Add New Publisher</Link>
                </div> 
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        publisher : state.publisherReducer.publisher
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getPublisher : () => dispatch(publisherActionTypes.getPublisher())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PublisherControlPanel);