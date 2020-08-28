import React, { Component } from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

import classes from './AddBook.module.css';
import Input from '../../../components/UI/form/input/Input';
import Button from '../../../components/UI/form/button/button';

import { connect } from 'react-redux';
import * as authorActionTypes from '../../../store/actions/authorAction';
import * as publisherActionTypes from '../../../store/actions/publisherAction';
import * as genreActionTypes from '../../../store/actions/genreAction';
import { withRouter } from 'react-router-dom';
import Spinner from '../../../components/UI/spinner/Spinner';
import AutoComplete from '../../../components/UI/select/AutoComplete';


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
                isvalid: true,
                name:"title"
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
                isvalid: true,
                name:"isbn"
            },
            price : {
                elementType: "input",
                elementConfig:{
                    placeholder: "PRICE",
                    type:"number"
                },
                value : "",
                validation:{
                    isNumeric: true,
                    required: true,
                    maxLength:5
                },
                touched: false,
                isvalid: true,
                name:"isbn"
            },
            publishedOn : {
                elementType: "input",
                elementConfig:{
                    placeholder: "DATE",
                    type:"date"
                },
                value : "",
                validation:{
                    required: true,
                },
                touched: false,
                isvalid: true,
                name:"publishedOn"
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
                isvalid: true,
                name:"language"
            },
            author : {
                options:[],
                value:'',
                placeholder:'Enter Author Name'
            },
            publisher : {
                options:[],
                value:'',
                placeholder:'Enter Publisher Name'
            },
            genre : {
                options:[],
                value:'',
                placeholder:'Enter Genre Name'
            },
            returnOption:{
                value:false,
                elementType:"radio",
                elementConfig:{
                    buttons: [{id:1,value:true,label:'returnable',name:'returnOption'},{id:2,value:false,label:'non-returnable',name:'returnOption'}]
                },
                touched:false,
                validation:false
                },
            bindingOption:{
                value:'',
                elementType:"radio",
                elementConfig:{
                    buttons: [{id:1,value:'Hardcover',label:'Hard Cover',name:'bindingOption'},{id:2,value:'Softcover',label:'Soft Cover',name:'bindingOption'}]
                },
                touched:false,
                validation:false
                },
            description :{
                elementType: "textarea",
                elementConfig:{
                    placeholder:"Enter Book Discription",
                    type:"text",
                    rows:5
                },
                value:'',
                validation:{
                    required: true,
                    comments: true
                },
                touched:false,
                isvalid:true,
                name:'description'
            }
        },
        authorUpdating:true
    }
    checkValidation = (value, rule) =>{
        let isvalid = true;

        if(!rule){
            return isvalid = true;
        }

        if(rule.required){
            isvalid = value.trim(' ') !== '' && isvalid;
        }

        if(rule.minLength){
            isvalid = value.length >= rule.minLength && isvalid;
        }

        // console.log(value.length,rule.maxLength);   
        if(rule.maxLength){
            // console.log(value.length,rule.maxLength);
            isvalid = value.length < rule.maxLength && isvalid;
        }
        if (rule.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            // console.log(pattern.test(value),isvalid);
            isvalid = pattern.test(value) && isvalid;
        }

        if (rule.isNumeric) {
            const pattern = /^\d+$/;
            isvalid = pattern.test(value) && isvalid
        }
        return isvalid;
    }

    formValidation = () => {
        let validating = false;
        let formElement = [];
        for(let key in this.state.addform){
            formElement.push({
                id : key,
                config : this.state.addform[key]
            })
        }
        validating = formElement.map( element => {
            if(element.config.touched && element.config.isvalid){
                return true;
            }else{
                return false;
            }
        })
        return validating.pop();
    }  
    inputChangeHandeler = (event,identifier) =>{        
        const updatedAddForm = {...this.state.addform};
        const updatedAddFormElement = {...updatedAddForm[identifier]};
        updatedAddFormElement.value = event.target.value;
        updatedAddFormElement.touched = true;
        updatedAddFormElement.isvalid = this.checkValidation(updatedAddFormElement.value , updatedAddFormElement.validation);
        updatedAddForm[identifier] = updatedAddFormElement;
        // console.log(updatedAddForm)
        this.setState({
            addform:updatedAddForm
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = this.state.addform;
        if(this.formValidation()){
            const bookData = {
                title : data.title.value,
                isbn :  data.isbn.value,
                publishedOn : data.publishedOn.value,
                price : data.price.value ,
                language : data.language.value.toUpperCase(),
                returnable : data.returnOption.value,
                authorId : data.author.value,
                publisherId : data.publisher.value,
                genreId : data.genre.value,
                description : data.description.value,
                binding : data.bindingOption.value
            }
            const token = JSON.parse(localStorage.getItem('userDetails')).token;
            Axios({
                method:'post',
                url:'/books/add',
                data: bookData,
                headers: {'HTTP_AUTHORIZATION' : token }

            })
            .then(res => {
                // console.log(res);
                // console.log(this.props)
                if(res.data.response === true){
                    alert('Book Created Successfully');
                    // window.location.reload(false);
                    this.props.history.push(`/admin/book/cover/${res.data.data}`);
                }
            })
            .catch(err => {
                console.log(err)
            })
        } else {
            this.setState({
                error: true
            })
        }
    }

    componentDidMount(){
        this.props.getAuthors();
        this.props.getPublisher();
        this.props.getGenre();
    }

    updatingTheAuthors=()=>{
        let updatedAddformElement = {...this.state.addform};
        let updatedPublisherElement = {...updatedAddformElement['publisher']}
        let updatedGenreElement = {...updatedAddformElement['genre']}
        let updatedAuthorElement = {...updatedAddformElement['author']};
        updatedAuthorElement.options = this.props.authors.map(authorname => {
            // console.log(authorname)
            return {
                id: authorname.authorId,
                value: authorname.authorName
            }
        });
        updatedPublisherElement.options = this.props.publisher.map(publishername => {
            return {
                id: publishername.publisherId,
                value: publishername.publisherName
            }
        });
        updatedGenreElement.options = this.props.genre.map(genrename => {
            return {
                id: genrename.genreId,
                value: genrename.genreName
            }
        });
        updatedAddformElement['author'] = updatedAuthorElement;
        updatedAddformElement['publisher'] = updatedPublisherElement;
        updatedAddformElement['genre'] = updatedGenreElement;
        this.setState({
            addform:updatedAddformElement,
            authorUpdating: false
        })
    }

    getvalues = (name,value) => {
        console.log(name)
        const updateState = {...this.state};
        const updatedAddFormElement = {...updateState['addform']};
        updatedAddFormElement[name].value=value;
        this.setState({
            ...updateState
        })
    }

    render() {
        if(localStorage.getItem('userDetails') === null){
            return <Redirect to='/admin/login' />
        }
        if(JSON.parse(localStorage.getItem('userDetails')).role !== 'admin'){
            return <Redirect to='/admin/login' />
        }
        let error = null;   
        if(this.state.error){
            error =  <div className={classes.Error}>
                        <p>Validation Failed </p>
                    </div>
        }
        const formElement = [];

        for(let key in this.state.addform){
            formElement.push({
                id : key,
                config : this.state.addform[key]
            })
        }

        let form = 
                formElement.map(formElement => {
                    switch(formElement.id){
                        case 'author': 
                            return <AutoComplete
                                    linkto='/admin/author/add'
                                    data={formElement.config.options} 
                                    placeholder={formElement.config.placeholder}
                                    value={formElement.config.value}
                                    name={formElement.id}
                                    selected={this.getvalues}/>
                        case 'publisher':
                            return <AutoComplete
                                    linkto='/admin/publisher/add'
                                    data={formElement.config.options} 
                                    placeholder={formElement.config.placeholder}
                                    value={formElement.config.value}
                                    name={formElement.id}
                                    selected={this.getvalues}/>
                        case 'genre':
                            return <AutoComplete
                                    linkto='/admin/genre/add'
                                    data={formElement.config.options} 
                                    placeholder={formElement.config.placeholder}
                                    value={formElement.config.value}
                                    name={formElement.id}
                                    selected={this.getvalues}/>
                        default:
                            return <Input
                            key={formElement.id}
                            elementType = {formElement.config.elementType}
                            elementConfig = {formElement.config.elementConfig}
                            value = {formElement.config.value}
                            isvalid = {formElement.config.isvalid}
                            label = {formElement.config.label}
                            changed = {(event)=>this.inputChangeHandeler(event,formElement.id)}  />
                    }
            })
        if(this.props.authorLoading && this.state.authorUpdating && this.props.publisherLoading && this.props.genreLoading){
            form = <Spinner />
        }
        if(!this.props.authorLoading && this.state.authorUpdating && !this.props.publisherLoading && !this.props.genreLoading){
            this.updatingTheAuthors();
        }
        return (
            <div className={classes.Section}>
                <h1>Add Book</h1>
                {error}
                <form >
                    <div className={classes.Form}>
                    {form}
                    </div>
                    <Button type="submit" clicked={this.handleSubmit}>AddBook</Button> 
                </form>
                <p>To Edit Book Search a book manually and edit</p>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        authors : state.authorReducer.authors,
        publisher : state.publisherReducer.publisher,
        genre : state.genreReducer.genre,
        authorLoading : state.authorReducer.authorLoading,
        publisherLoading : state.publisherReducer.publisherLoading,
        genreLoading : state.genreReducer.genreLoading,
        loggedIn : state.loginReducer.loggedIn
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getAuthors : () => dispatch(authorActionTypes.getAuthors()),
        getPublisher : () =>dispatch(publisherActionTypes.getPublisher()),
        getGenre : () => dispatch(genreActionTypes.getGenre())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(AddBook));