import React, { Component } from 'react'

import classes from './BooksControlPanel.module.css';
import Input from '../../components/UI/form/input/Input';
import Button from '../../components/UI/form/button/button';
import { connect } from 'react-redux';

import * as authorActionTypes from '../../store/actions/authorAction';
import * as genreActionTypes from '../../store/actions/genreAction';
import * as bookActionTypes from '../../store/actions/bookAction';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

class BooksControlPanel extends Component {

    state = {
        searchForm:{
            author : {
                elementType: "select",
                elementConfig:{
                    options: this.props.authors
                },
                value : "--null--",
                validation:{
                    isNumeric:true
                },
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
                validation:{
                    isNumeric:true
                },
                touched: false,
                isvalid: true,
                label:"Genre"
            },
        },
        selectForm:{
            title : {
                elementType: "select",
                elementConfig:{
                    options: this.props.title
                },
                validation:{
                    isNumeric:true
                },
                value : "Loading...",
                touched: false,
                isvalid: true,
                label:"Title"
            }
        },
        step2:false,
        error:false,
        updating: true,
        titleUpdate: false
    }
    
    componentDidMount(){
        this.props.getAuthors();
        this.props.getGenre();
    }
    updating=()=>{
        // console.log('updating...')
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
    updateTitle = () => {
        // console.log('updating title...');
        let updatedState = {...this.state}
        let updatedselectformElement = {...updatedState['selectForm']};
        let updatedTitleElement = {...updatedselectformElement['title']};
        updatedTitleElement.elementConfig.options = this.props.title.map(titles => {
            // console.log(titles)
            return {
                value: titles.bookId,
                dispVal: titles.title
            }
        });
        updatedState.titleUpdate = false;
        updatedState.selectForm = updatedselectformElement;
        // console.log(updatedState);
        // this.setState({
        //     state:updatedState
        // })
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
        for(let key in this.state.searchForm){
            formElement.push({
                id : key,
                config : this.state.searchForm[key]
            })
        }
        validating = formElement.map( element => {
            if(element.config.touched && element.config.isvalid){
                return true;
            }else{
                return false;
            }
        })
        return ! validating.some(valid => valid===false);
    }  
    handleChange = (event,identifier,form) => {
        const updatedState = {...this.state}
        const updatedSearchForm = {...updatedState[form]};
        const updatedSearchFormElement = updatedSearchForm[identifier];
        updatedSearchFormElement.value = event.target.value;
        updatedSearchFormElement.touched = true;
        updatedSearchFormElement.isvalid = this.checkValidation(updatedSearchFormElement.value , updatedSearchFormElement.validation);
            this.setState({
                ...this.state,
                searchForm:updatedSearchForm
            })
    }
    handleGetbook = () => {
        if(this.state.searchForm.author.value !== '--null--' && this.state.searchForm.genre.value !== '--null--'){
            this.props.getBooksTitle(this.state.searchForm.author.value,this.state.searchForm.genre.value);
            this.setState({
                ...this.state,
                step2: ! this.state.step2,
                titleUpdate: true
            })
        } else {
            this.setState({
                ...this.state,
                error: true
            })
        }
    }
    handlesteps = () => {
        // console.log('go back');
        this.setState({
            step2: !this.state.step2
        })
    }
    handleSubmit = () => {
        // console.log(this.formValidation())
        if(this.state.selectForm.title.value !== 'Loading...'){
            this.props.history.push('/admin/book/view/'+this.state.searchForm.title.value);
        } else {
            this.setState({
                error: true
            })
        }
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
        let error = null;   
        if(this.state.error){
            error =  <div className={classes.Error}>
                        <p>Select Valid Input</p>
                    </div>
        }
        const formElement1 = [];

        for(let key in this.state.searchForm){
            formElement1.push({
                id : key,
                config : this.state.searchForm[key]
            })
        }

        let form1 = (
                formElement1.map(formElement =>{
                    
                    return(
                        <Input
                    key={formElement.id}
                    elementType = {formElement.config.elementType}
                    elementConfig = {formElement.config.elementConfig}
                    value = {formElement.config.value}
                    isvalid = {formElement.config.isvalid}
                    label = {formElement.config.label}
                    changed = {(event)=>this.handleChange(event,formElement.id,'searchForm')}  />
                    );
                }
              )
        );
        const formElement2 = [];

        for(let key in this.state.selectForm){
            formElement2.push({
                id : key,
                config : this.state.selectForm[key]
            })
        }

        let form2 = (formElement2.map(formElement =>{
                    
                    return(
                        <Input
                    key={formElement.id}
                    elementType = {formElement.config.elementType}
                    elementConfig = {formElement.config.elementConfig}
                    value = {formElement.config.value}
                    isvalid = {formElement.config.isvalid}
                    label = {formElement.config.label}
                    changed = {(event)=>this.handleChange(event,formElement.id,'selectForm')}  />
                    );
                }
              )
        );
        let formdisp = null;
        if(this.state.step2){
            formdisp = null;
            formdisp = <form>
                            {form2}
                            <div className={classes.Button}>
                                <Button type="button" clicked={this.handleSubmit}>Get Books</Button> 
                            </div> 
                            <div className={classes.Button}>
                                <Button type="button" clicked={this.handlesteps}>Go Back</Button> 
                            </div> 
                        </form>
        } 
        else {
            formdisp = null;
            formdisp = <form>
                            {form1}
                            <div className={classes.Button}>
                                <Button type="button" clicked={this.handleGetbook}>Get Books</Button> 
                            </div>
                        </form>
        }
        if(this.props.authorLoading && this.state.updating && this.props.genreLoading){
            form1 = <p>Loding....</p>
        }
        if( !this.props.authorLoading && this.state.updating && !this.props.genreLoading){
            this.updating();
        }
        if(this.props.titleLoading){
            form2 = <p>Loding....</p>
        }
        if(!this.props.titleLoading){
            this.updateTitle();
        }
        return (
            <div>
                <div className={classes.Greetings}>
                    <h1>Select A Book</h1>
                    {error}
                    <div className={classes.Forms}>
                        {formdisp}
                    </div> 
                    <div>
                        <Link to='/admin/book/add' className={classes.Link}>Add New Book</Link>
                    </div> 
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        authors : state.authorReducer.authors,
        authorLoading : state.authorReducer.authorLoading,
        genre : state.genreReducer.genre,
        genreLoading : state.genreReducer.genreLoading,
        title : state.bookReducer.bookstitle,
        titleLoading : state.bookReducer.bookstitleLoading,
        loggedIn : state.loginReducer.loggedIn
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getAuthors : () => dispatch(authorActionTypes.getAuthors()),
        getGenre : () => dispatch(genreActionTypes.getGenre()),
        getBooksTitle : (authorId,genreId) => dispatch(bookActionTypes.getBooksTitlesArray(authorId,genreId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BooksControlPanel);