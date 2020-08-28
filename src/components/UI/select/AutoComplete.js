import React, { Component } from 'react';

import classes from './AutoComplete.module.css';
import Suggestion from './Suggestion';

export default class AutoComplete extends Component {
    state = {
        filteredSuggestions: [],
        userInput: this.props.displayValue ? this.props.displayValue : '',
        // userInput: '',
        hideSuggestion: true
    }
    onChange = (event) => {
        let filterarray = this.props.data.filter((data)=> {
            return data.value.toLowerCase().includes(this.state.userInput.toLowerCase());
        });
        // console.log('onchange',event.target.value,this.props.data);

        if(event.target.value.length === 0){
            // console.log('onchange',event.target.value);
            filterarray = []
        }
        this.setState({
            userInput: event.target.value,
            filteredSuggestions: filterarray,
            hideSuggestion:false
        })
    }
    selected = (id,value,name) => {
        this.props.selected(name,id)
        this.setState({
            ...this.state,
            userInput: value,
            hideSuggestion: true,
            default:false
        })
    }
    render() {
        return (
            <div className={classes.AutoComplete}>
                <input 
                type="text"
                onChange={this.onChange}
                placeholder={this.props.placeholder}
                value={this.state.userInput} />
                <div>
                    <Suggestion 
                    linkto={this.props.linkto}
                    filteredSuggestions={this.state.filteredSuggestions} 
                    selected={this.selected} 
                    show={this.state.hideSuggestion} 
                    userInput = {this.state.userInput}
                    name={this.props.name}/>
                </div>
            </div>
        )
    }
}
