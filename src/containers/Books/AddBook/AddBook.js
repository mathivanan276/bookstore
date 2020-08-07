import React, { Component } from 'react';

import classes from './AddBook.module.css';
import Input from '../../../components/UI/form/input/Input';
import Button from '../../../components/UI/form/button/button';

import { connect } from 'react-redux';
import * as authorActionTypes from '../../../store/actions/authorAction';
import * as publisherActionTypes from '../../../store/actions/publisherAction';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class AddBook extends Component {

    state = {
        addform : {
            title : {
                elementType: "input",
                elementConfig:{
                    placeholder: "TITLE",
                    type:"text"
                },
                value : "",
                validation:{
                    required: true
                },
                touched: false,
                isvalid: true
            },
            isbn : {
                elementType: "input",
                elementConfig:{
                    placeholder: "ISBN",
                    type:"text"
                },
                value : "",
                validation:{
                    required: true
                },
                touched: false,
                isvalid: true
            },
            year : {
                elementType: "input",
                elementConfig:{
                    placeholder: "DATE",
                    type:"date"
                },
                value : "",
                validation:{
                    required: true
                },
                touched: false,
                isvalid: true
            },
            language : {
                elementType: "input",
                elementConfig:{
                    placeholder: "LANGUAGE",
                    type:"text"
                },
                value : "",
                validation:{
                    required: true
                },
                touched: false,
                isvalid: true
            },
            author : {
                elementType: "select",
                elementConfig:{
                    options: this.props.authors
                },
                value : "",
                validation:false,
                touched: false,
                isvalid: true
            },
            publisher : {
                elementType: "select",
                elementConfig:{
                    placeholder: "LANGUAGE",
                    type:"text",
                    options: this.props.authors
                },
                value : "",
                validation:false,
                touched: false,
                isvalid: true
            }
        },
        authorUpdating:true
    }
    componentDidMount(){
        this.props.getAuthors();
        this.props.getPublisher();
    }

    updatingTheAuthors=()=>{
        let updatedAddformElement = {...this.state.addform};
        let updatedPublisherElement = {...updatedAddformElement['publisher']}
        let updatedAuthorElement = {...updatedAddformElement['author']};
        updatedAuthorElement.elementConfig.options = this.props.authors.map(authorname => {
            return {
                value: authorname.authorId,
                dispVal: authorname.authorName
            }
        });
        updatedPublisherElement.elementConfig.options = this.props.publisher.map(publishername => {
            return {
                value: publishername.publisherId,
                dispVal: publishername.publisherName
            }
        });
        this.setState({
            addform:updatedAddformElement,
            authorUpdating: false
        })
    }

    render() {
        const formElement = [];

        for(let key in this.state.addform){
            formElement.push({
                id : key,
                config : this.state.addform[key]
            })
        }

        let form = (
                formElement.map(formElement => (
                <Input 
                    key={formElement.id}
                    elementType = {formElement.config.elementType}
                    elementConfig = {formElement.config.elementConfig}
                    value = {formElement.config.value}
                    isvalid = {formElement.config.isvalid}
                    // label = {formElement.id}
                    changed = {(event)=>this.inputChangeHandeler(event,formElement.id)}  />
              ))
        );
        if(this.props.authors[0].id !== 1 && this.state.authorUpdating && this.props.publisher[0].id !== 1){
            this.updatingTheAuthors();
            form = <p>Loading...</p>
        }
        return (
            <div className={classes.Section}>
                <h1>Add Book</h1>
                <form>
                    {form}
                    <Button type="submit" clicked={this.handleRegister}>Register</Button> 
                </form>
                <p>Edit Existing Book | <Link to='/admin/book/edit'><span className={classes.Link}>Click Here</span></Link></p>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        authors : state.authorReducer.authors,
        publisher : state.publisherReducer.publisher
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getAuthors : () => dispatch(authorActionTypes.getAuthors()),
        getPublisher : () =>dispatch(publisherActionTypes.getPublisher())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddBook);