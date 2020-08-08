import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import classes from './EditBook.module.css';
import Axios from 'axios';
import Input from '../../../components/UI/form/input/Input';
import Button from '../../../components/UI/form/button/button';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as authorActionTypes from '../../../store/actions/authorAction';
import * as publisherActionTypes from '../../../store/actions/publisherAction';
import * as genreActionTypes from '../../../store/actions/genreAction';
import * as bookActionTypes from '../../../store/actions/bookAction';


class EditBook extends Component {
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
                elementType: "select",
                elementConfig:{
                    options: this.props.authors
                },
                value : "--null--",
                validation:false,
                touched: false,
                isvalid: true,
                name:"author"
            },
            publisher : {
                elementType: "select",
                elementConfig:{
                    options: this.props.publisher
                },
                value : "--null--",
                validation:false,
                touched: false,
                isvalid: true,
                name:"publisher"
            },
            genre : {
                elementType: "select",
                elementConfig:{
                    options: this.props.genre
                },
                value : "--null--",
                validation:false,
                touched: false,
                isvalid: true,
                name:"genre"
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
    inputChangeHandeler = (event,identifier,check) =>{        
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

    handleSearch = (event) => {
        let data = this.state.search.value;
        if(this.state.search.touched){
            this.props.getBookTitle(data);
        } else {
            alert('Enter Book Title');
        }
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
                description : data.description.value
            }
            Axios.post('/books/add',bookData)
            .then(res => {
                if(res.data.response === true){
                    alert('Book Created Successfully');
                    window.location.reload(false);
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
        updatedGenreElement.elementConfig.options = this.props.genre.map(genrename => {
            return {
                value: genrename.genreId,
                dispVal: genrename.genreName
            }
        });
        this.setState({
            addform:updatedAddformElement,
            authorUpdating: false
        })
    }

    render() {
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

        let form = (
                formElement.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType = {formElement.config.elementType}
                    elementConfig = {formElement.config.elementConfig}
                    value = {formElement.config.value}
                    isvalid = {formElement.config.isvalid}
                    label = {formElement.config.label}
                    changed = {(event)=>this.inputChangeHandeler(event,formElement.id)}  />
              ))
        );
        if(this.props.authors[0].id === 1 && this.state.authorUpdating && this.props.publisher[0].id === 1 && this.props.genre[0].id === 1){
            form = <p>Loding....</p>
        }
        if(this.props.authors[0].id !== 1 && this.state.authorUpdating && this.props.publisher[0].id !== 1 && this.props.genre[0].id !== 1){
            this.updatingTheAuthors();
        }
        let editform = (<form>
                        <div className={classes.Form}>
                        {form}
                        </div>
                        <Button type="submit" clicked={this.handleSubmit}>Register</Button> 
                    </form>);
        return (
            <div className={classes.Section}>
                <h1>Edit Book</h1>
                {error}
                {editform}
                <p>Add A Book | <Link to='/admin/book/add'><span className={classes.Link}>Click Here</span></Link></p>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        authors : state.authorReducer.authors,
        publisher : state.publisherReducer.publisher,
        genre : state.genreReducer.genre
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getAuthors : () => dispatch(authorActionTypes.getAuthors()),
        getPublisher : () =>dispatch(publisherActionTypes.getPublisher()),
        getGenre : () => dispatch(genreActionTypes.getGenre()),
        // getBookTitle : (title) => dispatch(bookActionTypes.getTitles(title))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withRouter(EditBook));