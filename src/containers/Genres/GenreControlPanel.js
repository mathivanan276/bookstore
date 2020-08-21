import React, { Component } from 'react';
import { Redirect,Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as genreActionTypes from '../../store/actions/genreAction';
import classes from './GenreControlPanel.module.css';
import Input from '../../components/UI/form/input/Input';
import Button from '../../components/UI/form/button/button';
import Spinner from '../../components/UI/spinner/Spinner';

class GenreControlPanel extends Component {

    state = {
            genre : {
                elementType: "select",
                elementConfig:{
                    options: this.props.authors
                },
                value : "--null--",
                touched: false,
                isvalid: true,
                label:"genre"
            },
        error:false,
        updating:true
    }
    handleChange = (event) => {
        const updatedgenreElement = {...this.state.genre};
        updatedgenreElement.value = event.target.value;
        updatedgenreElement.touched = true;
        if(event.target.value === '--null--'){
            updatedgenreElement.isvalid = false
            this.setState({
                error: true,
                genre:updatedgenreElement
            })
        } else {
            updatedgenreElement.isvalid = true
            this.setState({
                error: false,
                genre:updatedgenreElement
            })
        }
    }

    updating = () => {
        const updatedgenreElement = {...this.state.genre};
        updatedgenreElement.elementConfig.options = this.props.genre.map((genre,index) => {
            return {
                value: index,
                dispVal: genre.genreName
            }
        });
        this.setState({
            ...this.state,
            genre:updatedgenreElement,
            updating:false
        })
    }

    componentDidMount(){
        this.props.getGenre();
    }
    handleSubmit = () => {
        if(this.state.genre.value !== '--null--'){
            this.props.history.push('/admin/genre/edit/'+this.state.genre.value);
        } else {
            this.setState({
                error:true
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
                        <p>Select Valid Genre</p>
                    </div>
        }
        let form = null;

        form = (
            <form>
                <Input 
                elementType = {this.state.genre.elementType}
                elementConfig = {this.state.genre.elementConfig}
                value = {this.state.genre.value}
                isvalid = {this.state.genre.isvalid}
                changed = {(event)=>this.handleChange(event)}  />
                <div className={classes.Button}>
                    <Button type="button" clicked={this.handleSubmit}>Edit Genre</Button> 
                </div> 
            </form>
        );

        if(this.props.genreLoading){
            form = null;
            form = <Spinner />
        }
        if(!this.props.genreLoading && this.state.updating){
            this.updating();
        }
        return (
            <div className={classes.Greetings}>
                <h1>Select Genre</h1>
                {error}
                <div className={classes.Forms}>
                    {form}
                </div> 
                <div>
                    <Link to='/admin/genre/add' className={classes.Link}>Add New Genre</Link>
                </div> 
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        genre : state.genreReducer.genre,
        genreLoading : state.genreReducer.genreLoading,
        loggedIn : state.loginReducer.loggedIn
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getGenre : () => dispatch(genreActionTypes.getGenre())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(GenreControlPanel);