import React, { Component } from 'react'

import classes from './AdminHome.module.css';
import Input from '../../../components/UI/form/input/Input';
import { connect } from 'react-redux';

import * as authorActionTypes from '../../../store/actions/authorAction';
import * as publisherActionTypes from '../../../store/actions/publisherAction';
import * as genreActionTypes from '../../../store/actions/genreAction';
import * as bookActionTypes from '../../../store/actions/bookAction';

class AdminHome extends Component {

    state = {
        searchForm:{
            author : {
                elementType: "select",
                elementConfig:{
                    options: this.props.authors
                },
                value : "--null--",
                validation:false,
                touched: false,
                isvalid: true,
                label:"Author"
            },
            genre : {
                elementType: "select",
                elementConfig:{
                    options: this.props.authors
                },
                value : "--null--",
                validation:false,
                touched: false,
                isvalid: true,
                label:"Genre"
            },
            title : {
                elementType: "input",
                elementConfig:{
                    placeholder: 'Enter Title',
                    type: 'text'
                },
                value : '',
                validation:false,
                touched: false,
                isvalid: true,
                label:"Title"
            }
        },
        updating: true
    }
    
    componentDidMount(){
        this.props.getAuthors();
        this.props.getGenre();
    }
    updating=()=>{
        console.log('updating...')
        let updatedAddformElement = {...this.state.searchForm};
        let updatedGenreElement = {...updatedAddformElement['genre']};
        let updatedAuthorElement = {...updatedAddformElement['author']};
        updatedAuthorElement.elementConfig.options = this.props.authors.map(authorname => {
            return {
                value: authorname.authorId,
                dispVal: authorname.authorName
            }
        });
        updatedGenreElement.elementConfig.options = this.props.genre.map(genrename => {
            return {
                value: genrename.genreId,
                dispVal: genrename.genreName
            }
        });
        this.setState({
            ...this.state,
            searchForm:updatedAddformElement,
            updating: false
        })
    }
    handleChange = (event,identifier) => {
        if(identifier === 'title'){
            // console.log('title')
            const updatedSearchForm = {...this.state.searchForm};
            const updatedTitleSearchForm = updatedSearchForm[identifier];
            updatedTitleSearchForm.value = event.target.value;
            this.setState({
                ...this.state,
                searchForm:updatedSearchForm
            })
            if(updatedTitleSearchForm.value.length >= 3 && this.state.searchForm.author.touched && this.state.searchForm.genre.touched){
                console.log(updatedTitleSearchForm.value);
                this.props.getBooks(this.state.searchForm.author.value,
                                    this.state.searchForm.genre.value,
                                    this.state.searchForm.title.value)
                return true;
            }
            return true;
        }
        const updatedSearchForm = {...this.state.searchForm};
        const updatedSearchFormElement = updatedSearchForm[identifier];
        updatedSearchFormElement.value = event.target.value;
        updatedSearchFormElement.touched = true;
            this.setState({
                ...this.state,
                searchForm:updatedSearchForm
            })
    }
    render() {
        const formElement = [];

        for(let key in this.state.searchForm){
            formElement.push({
                id : key,
                config : this.state.searchForm[key]
            })
        }

        let form = (
                formElement.map(formElement =>{
                    if(formElement.config.elementType === 'input'){
                        return(
                            <div>
                            <label>{formElement.config.label}</label>
                            <Input
                            key={formElement.id}
                            elementType = {formElement.config.elementType}
                            elementConfig = {formElement.config.elementConfig}
                            isvalid = {formElement.config.isvalid}
                            changed = {(event)=>this.handleChange(event,formElement.id)}  />
                        </div>
                        )}
                    return(
                        <Input
                    key={formElement.id}
                    elementType = {formElement.config.elementType}
                    elementConfig = {formElement.config.elementConfig}
                    value = {formElement.config.value}
                    isvalid = {formElement.config.isvalid}
                    label = {formElement.config.label}
                    changed = {(event)=>this.handleChange(event,formElement.id)}  />
                    );
                }
              )
        );
        if(this.props.authors[0].id === 1 && this.state.updating && this.props.genre[0].id === 1){
            form = <p>Loding....</p>
        }
        if(this.props.authors[0].id !== 1 && this.state.updating && this.props.genre[0].id !== 1){
            this.updating();
        }
        const selectbook =<div className={classes.Message}>
                                <h1>Search Books</h1>
                            </div>;
        
        return (
            <div>
                <div className={classes.Greetings}>
                    <h1>Welcome</h1>
                    <form>
                        {form}
                    </form>
                </div>
                {selectbook}
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        authors : state.authorReducer.authors,
        genre : state.genreReducer.genre,
        
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getAuthors : () => dispatch(authorActionTypes.getAuthors()),
        getGenre : () => dispatch(genreActionTypes.getGenre()),
        getBooks : (authorId,genreId,title) => dispatch(bookActionTypes.getBooksByAuthor(authorId,genreId,title))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AdminHome);