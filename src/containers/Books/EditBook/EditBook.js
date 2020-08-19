import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';

import classes from './EditBook.module.css';
import Axios from 'axios';
import Input from '../../../components/UI/form/input/Input';
import Button from '../../../components/UI/form/button/button';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as authorActionTypes from '../../../store/actions/authorAction';
import * as publisherActionTypes from '../../../store/actions/publisherAction';
import * as genreActionTypes from '../../../store/actions/genreAction';
import * as bookActionsType from '../../../store/actions/bookAction';


class EditBook extends Component {
    state = {
        editform : {
            title : {
                elementType: "input",
                elementConfig:{
                    placeholder: "TITLE",
                    type:"text"
                },
                value : this.props.book.title,
                validation:{
                    required: true
                },
                isvalid: true
            },
            isbn : {
                elementType: "input",
                elementConfig:{
                    placeholder: "ISBN",
                    type:"text"
                },
                value : this.props.book.isbn,
                validation:{
                    required: true
                },
                isvalid: true,
                name:"isbn"
            },
            price : {
                elementType: "input",
                elementConfig:{
                    placeholder: "PRICE",
                    type:"number"
                },
                value : this.props.book.price,
                validation:{
                    isNumeric: true,
                    required: true,
                    maxLength:5
                },
                isvalid: true,
                name:"isbn"
            },
            publishedOn : {
                elementType: "input",
                elementConfig:{
                    placeholder: "DATE",
                    type:"date"
                },
                value : this.props.book.publishedOn,
                validation:{
                    required: true,
                },
                isvalid: true,
                name:"publishedOn"
            },
            language : {
                elementType: "input",
                elementConfig:{
                    placeholder: "LANGUAGE",
                    type:"text"
                },
                value : this.props.book.language,
                validation:{
                    required: true
                },
                isvalid: true,
                name:"language"
            },
            author : {
                elementType: "select",
                elementConfig:{
                    options: this.props.authors
                },
                value : this.props.book.authorId,
                validation:false,
                isvalid: true,
                name:"author"
            },
            publisher : {
                elementType: "select",
                elementConfig:{
                    options: this.props.publisher
                },
                value : this.props.book.publisherId,
                validation:false,
                isvalid: true,
                name:"publisher"
            },
            genre : {
                elementType: "select",
                elementConfig:{
                    options: this.props.genre
                },
                value : this.props.book.genreId,
                validation:false,
                isvalid: true,
                name:"genre"
            },
            returnOption:{
                value:this.props.book.returnable,
                elementType:"radio",
                elementConfig:{
                    buttons: [{id:1,value:'true',label:'returnable',name:'returnOption'},{id:2,value:'false',label:'non-returnable',name:'returnOption'}]
                },
                touched:false,
                validation:false
                },
            bindingOption:{
                value:this.props.book.returnable,
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
                value:this.props.book.description,
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
        for(let key in this.state.editform){
            formElement.push({
                id : key,
                config : this.state.editform[key]
            })
        }
        validating = formElement.map( element => {
            if(element.config.isvalid){
                return true;
            }else{
                return false;
            }
        })
        console.log(validating);
        return validating.pop();
    }  
    inputChangeHandeler = (event,identifier,check) =>{        
        const updatededitform = {...this.state.editform};
        const updatededitformElement = {...updatededitform[identifier]};
        updatededitformElement.value = event.target.value;
        updatededitformElement.isvalid = this.checkValidation(updatededitformElement.value , updatededitformElement.validation);
        updatededitform[identifier] = updatededitformElement;
        // console.log(updatededitform)
        this.setState({
            editform:updatededitform
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = this.state.editform;
        if(this.formValidation()){
            const bookData = {
                bookId: this.props.match.params.bookId,
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
                method: 'post',
                url:'/books/edit',
                data: bookData,
                headers: {'HTTP_AUTHORIZATION' : token }
            })
            .then(res => {
                console.log(res);
                if(res.data.response === true){
                    alert('Edited Successfully');
                    this.props.history.push('/admin/home');
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
        this.props.getBooks(this.props.match.params.bookId);
    }

    updating=()=>{
        let updatededitformElement = {...this.state.editform};
        let updatedPublisherElement = {...updatededitformElement['publisher']}
        let updatedGenreElement = {...updatededitformElement['genre']}
        let updatedAuthorElement = {...updatededitformElement['author']};
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
            editform:updatededitformElement,
            authorUpdating: false
        })
    }

    render() {
        if(this.props.loggedIn){
            const adminData = JSON.parse(localStorage.getItem('userDetails')).role;
            if(adminData !== 'admin'){
                return <Redirect to='/admin/login' />
            }
        } else {
            return <Redirect to='/home' />
        }
        if(this.props.book.title === 'getting'){
            return(
                <Redirect to='/admin/home' />
            )
        }
        let error = null;   
        if(this.state.error){
            error =  <div className={classes.Error}>
                        <p>Validation Failed </p>
                    </div>
        }
        const formElement = [];

        for(let key in this.state.editform){
            formElement.push({
                id : key,
                config : this.state.editform[key]
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
        if(this.props.authorLoading && this.state.authorUpdating && this.props.publisherLoading && this.props.genreLoading){
            form = <p>Loding....</p>
        }
        if(!this.props.authorLoading && this.state.authorUpdating && !this.props.publisherLoading&& !this.props.genreLoading){
            this.updating();
        }
        let editform = (<form>
                        <div className={classes.Form}>
                        {form}
                        </div>
                        <Button type="submit" clicked={this.handleSubmit}>Edit Book</Button> 
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
        authorLoading : state.authorReducer.authorLoading,
        publisher : state.publisherReducer.publisher,
        publisherLoading : state.publisherReducer.publisherLoading,
        genre : state.genreReducer.genre,
        genreLoading : state.genreReducer.genreLoading,
        book : state.bookReducer.book,
        loggedIn : state.loginReducer.loggedIn
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getAuthors : () => dispatch(authorActionTypes.getAuthors()),
        getPublisher : () =>dispatch(publisherActionTypes.getPublisher()),
        getGenre : () => dispatch(genreActionTypes.getGenre()),
        getBooks : (bookId) => dispatch(bookActionsType.getBook(bookId))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withRouter(EditBook));