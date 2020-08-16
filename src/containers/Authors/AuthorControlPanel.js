import React, { Component } from 'react';
import { Redirect,Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as authorActionTypes from '../../store/actions/authorAction';
import classes from './AuthorControlPanel.module.css';
import Input from '../../components/UI/form/input/Input';
import Button from '../../components/UI/form/button/button';

class AuthorControlPanel extends Component {

    state = {
            author : {
                elementType: "select",
                elementConfig:{
                    options: this.props.authors
                },
                value : "--null--",
                touched: false,
                isvalid: true,
                label:"Author"
            },
        error:false,
        updating:true
    }
    handleChange = (event) => {
        const updatedAuthorElement = {...this.state.author};
        updatedAuthorElement.value = event.target.value;
        updatedAuthorElement.touched = true;
        if(event.target.value === '--null--'){
            updatedAuthorElement.isvalid = false
            this.setState({
                error: true,
                author:updatedAuthorElement
            })
        } else {
            updatedAuthorElement.isvalid = true
            this.setState({
                error: false,
                author:updatedAuthorElement
            })
        }
    }

    updating = () => {
        const updatedAuthorElement = {...this.state.author};
        updatedAuthorElement.elementConfig.options = this.props.authors.map((authorname,index) => {
            return {
                value: index,
                dispVal: authorname.authorName
            }
        });
        this.setState({
            ...this.state,
            author:updatedAuthorElement,
            updating:false
        })
    }

    componentDidMount(){
        this.props.getAuthors();
    }
    handleSubmit = () => {
        if(this.state.author.value !== '--null--'){
            this.props.history.push('/admin/author/edit/'+this.state.author.value);
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
                        <p>Select Valid Author</p>
                    </div>
        }
        let form = null;

        form = (
            <form>
                <Input 
                elementType = {this.state.author.elementType}
                elementConfig = {this.state.author.elementConfig}
                value = {this.state.author.value}
                isvalid = {this.state.author.isvalid}
                changed = {(event)=>this.handleChange(event)}  />
                <div className={classes.Button}>
                    <Button type="button" clicked={this.handleSubmit}>Edit Author</Button> 
                </div> 
            </form>
        );

        if(this.props.authorLoading === 1){
            form = null;
            form = <p>Loding....</p>
        }
        if(!this.props.authorLoading && this.state.updating){
            this.updating();
        }
        return (
            <div className={classes.Greetings}>
                <h1>Select Author</h1>
                {error}
                <div className={classes.Forms}>
                    {form}
                </div> 
                <div>
                    <Link to='/admin/author/add' className={classes.Link}>Add New Author</Link>
                </div> 
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        authors : state.authorReducer.authors,
        authorLoading : state.authorReducer.authorLoading
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getAuthors : () => dispatch(authorActionTypes.getAuthors())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AuthorControlPanel);