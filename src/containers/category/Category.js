import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as genreActionType from '../../store/actions/genreAction';
import Spinner from '../../components/UI/spinner/Spinner';
import classes from './Category.module.css';

class Category extends Component {
    componentDidMount(){
        this.props.getCategories();
    }
    render() {
        if(this.props.categoryLoading){
            return <div><Spinner /></div>
        }
        let categoryList = null;
        if(this.props.categoryLoading === false){
            categoryList =  <ul>
                                {
                                    this.props.category.map( category => {
                                        return <li key={category.genreId}><Link to={'/search/'+category.genreName} >{category.genreName}</Link></li>
                                    })
                                }    
                            </ul>
        }
        return (
            <div className={classes.Section}>
                <h3>Select Category</h3>
                {categoryList}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        category : state.genreReducer.genre,
        categoryLoading : state.genreReducer.genreLoading
    }   
}

const mapDispatchToProps = dispatch => {
    return{
        getCategories: () => dispatch(genreActionType.getGenre())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);