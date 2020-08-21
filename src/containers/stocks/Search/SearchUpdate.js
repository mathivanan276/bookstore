import React, { Component } from 'react';

import classes from './SearchUpdate.module.css';
import Axios from 'axios';
import Spinner from '../../../components/UI/spinner/Spinner';

class SearchUpdate extends Component {
    state = {
        searchText : '',
        touched : false,
        searchedbook : {},
        result:false,
        notFound: false,
        error: false,
        loading: false
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
        this.setState({
            ...this.state,
            loading:true
        })
        if(this.state.searchText !== '' && this.state.touched){
            Axios.get('/books/bookstock/'+this.state.searchText)
            .then(res => {
                if(res.data.response === true){
                    this.setState({
                        ...this.state,
                        searchedbook: res.data.data,
                        result:true,
                        loading:false,
                        notFound:false
                    })
                } else {
                    this.setState({
                        ...this.state,
                        notFound:true,
                        loading:false
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
            result = <div className={classes.Section}>
                <h3>Search Book</h3>
            </div>
        }
        if(this.state.loading){
            result = <Spinner />
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
        if(this.state.notFound) {
            result = <div className={classes.Section}>
            <h3>0 Book Matched</h3>
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