import React, { Component } from 'react';
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
        preview : " ",
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
        
        return  await Axios.post('/books/uploadimg/'+this.props.match.params.bookId, formData,{
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(res=>{
          if(res.data.response === true){
            alert("Cover Uploaded Successfully")
            this.props.history.push('/admin/book/view/'+this.props.match.params.bookId);
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
        let error = null;   
        if(this.state.error){
            error =  <div className={classes.Error}>
                        <p>Validation Failed </p>
                    </div>
        }
        return (
            <div className={classes.Section}>
                <img src={this.state.preview} alt="Preview cover" className={classes.Cover} width='150px' height='200px' />
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

export default AddBookCover;