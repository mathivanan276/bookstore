import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import Axios from 'axios';

import classes from './AddBookCover.module.css';
import Input from '../../../components/UI/form/input/Input';
import Button from '../../../components/UI/form/button/button';

class AddBookCover extends Component {

    state = {
        image : {
            elementType: "input",
            elementConfig:{
                placeholder: "TITLE",
                type:"file"
            },
            touched:false
        },
        file:'',
        preview : '',
        error:false
    }
    handleSubmit = async (event)=> {
        event.preventDefault() 
        console.log(this.state)
        if(this.state.image.touched){
            await this.uploadFile(this.state.file);
        }
        else{
            this.setState({
                error:true
            })
        }
    }
    uploadFile = async(file) => {
        const formData = new FormData();
        
        formData.append('image',file)
        const token = JSON.parse(localStorage.getItem('userDetails')).token;
        return  await Axios.post('/books/uploadimg/'+this.props.match.params.bookId, formData,{
            headers: {
                'content-type': 'multipart/form-data',
                'HTTP_AUTHORIZATION' : token
            }
        })
        .then(res=>{
          if(res.data.response === true){
            alert("Cover Uploaded Successfully")
            this.props.history.push('/admin/book');
          }
        });
      }

    onChange(e) {
        this.setState({file:e.target.files[0]})
    }
    handleChange= (event) => {
        const imageElement = {...this.state.image}
        imageElement['touched'] = !this.state.image.touched;
        this.setState({
            ...this.state,
            image:imageElement,
            file: event.target.files[0],
            preview:URL.createObjectURL(event.target.files[0])
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
        // if(this.props.book.title === 'getting'){
        //     return(
        //         <Redirect to='/admin/home' />
        //     )
        // }
        let error = null;   
        if(this.state.error){
            error =  <div className={classes.Error}>
                        <p>Validation Failed </p>
                    </div>
        }
        let image = <img src={this.props.book.imageUrl} alt="Preview cover" className={classes.Cover} width='150px' height='200px' />;
        if(this.state.preview !== ''){
            image = null;
            image = <img src={this.state.preview} alt="Preview cover" className={classes.Cover} width='150px' height='200px' />;
        }
        return (
            <div className={classes.Section}>
                {image}
                <form>
                    {error}
                    <Input 
                    elementType = {this.state.image.elementType}
                    elementConfig = {this.state.image.elementConfig}
                    isvalid = {true}
                    changed = {(event)=>this.handleChange(event)}  />
                    <Button type="submit" clicked={this.handleSubmit}>upload</Button> 
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        book : state.bookReducer.book,
        loggedIn : state.loginReducer.loggedIn
    }
}

export default connect(mapStateToProps)(AddBookCover);