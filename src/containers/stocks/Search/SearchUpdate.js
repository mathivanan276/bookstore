import React, { Component } from 'react';

import classes from './SearchUpdate.module.css';
import Axios from 'axios';

class SearchUpdate extends Component {
    state = {
        searchText : '',
        touched : false,
        searchedbook : {},
        result:false,
        error: false,
    }
    handleChange = (event) => {
        this.setState({
            ...this.state,
            searchText : event.target.value,
            touched :true
        })
    }
    handleUpdate = (event,bookId) => {
        event.preventDefault();
        if(this.state.searchedbook.stock > 20){
            Axios.post('/books/changestock/'+bookId,{quantity : this.state.searchedbook.stock})
            .then( res => {
                window.location.reload(false);
            })
            .catch( err => {
                console.log(err);
            })
        } else {
            console.log('error')
            this.setState({
                ...this.state,
                error:true
            })
        }
    }
    handleStockChange = (event) => {
        const updatedBook = {...this.state.searchedbook};
        updatedBook.stock = event.target.value;
        this.setState({
            ...this.state,
            searchedbook : updatedBook
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.searchText !== '' && this.state.touched){
            Axios.get('/books/bookstock/'+this.state.searchText)
            .then(res => {
                if(res.data.response === true){
                    this.setState({
                        ...this.state,
                        searchedbook: res.data.data,
                        result:true
                    })
                } else {
                    this.setState({
                        ...this.state,
                        result:false
                    })
                }
            })
            .catch (err => {
                console.log(err);
            })
        }
    }
    render() {
        let result = null;
        if(!this.state.result){
            result = <div>
                <h3>Search Book</h3>
            </div>
        }
        let error = null;
        if(this.state.error){
            error = <p className={classes.Error}>
                Input Should Be greater then 20
            </p>
        }
        if(this.state.result){
            result =  <div className={classes.Section}>
                        <table className={classes.Table}>
                            <tr>
                                <th>BOOK ID</th>
                                <th>TITLE</th>
                                <th>QUANTITY</th>
                                <th></th>   
                            </tr>
                            <tr>
                                <td> {this.state.searchedbook.id} </td>
                                <td> {this.state.searchedbook.title} </td>
                                <td> 
                                    <input 
                                    placeholder='QUANTITY' 
                                    value={this.state.searchedbook.stock} 
                                    type='number' 
                                    onChange={this.handleStockChange} /> 
                                </td>
                                <td> <button className={classes.UpdateBook} onClick={(event) => this.handleUpdate(event,this.state.searchedbook.id)}>update</button> </td>
                            </tr>
                        </table>
                       </div> 
        }      
        return (
            <div className={classes.SearchBar}>
                <form onSubmit={this.handleSubmit}> 
                    <input 
                        type='text' 
                        name='searchbox' 
                        placeholder='ISBN' 
                        className={classes.Input} 
                        onChange={this.handleChange}  />
                    <button type='submit'>search</button>
                </form>
                <div>
                    {error}
                    {result}
                </div>
            </div>
        )
    }
}

export default SearchUpdate;