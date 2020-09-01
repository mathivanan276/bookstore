import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as genreActionType from '../store/actions/genreAction';
import classes from './SideBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

class Sidebar extends Component {

    componentDidMount(){
        this.props.getCategories();
    }
    render() {
        let SidebarClass = null;
        if(this.props.open){
            SidebarClass = [classes.SidebarMobile,classes.Open];
        } else {
            SidebarClass = [classes.SidebarMobile,classes.Close];
        }
        let categoryList = null;
        if(this.props.categoryLoading === false){
            categoryList =  <ul>
                                {
                                    this.props.category.map( (category,index) => {
                                        if(index < 10){
                                            return <li key={category.genreId} onClick={this.props.close}><Link to={'/search/'+category.genreName} >{category.genreName}</Link></li>
                                        }
                                    })
                                }    
                                <li><Link to='/categories'>more...</Link></li>
                            </ul>
        }
        return (
            <>
            <div className={SidebarClass.join(' ')} onClick={this.props.close}>
                <div className={classes.Section}>
                    <div style={{width:'fit-content',marginLeft:'auto',paddingRight:'0.75rem',cursor:'pointer'}} onClick={this.props.close}><FontAwesomeIcon icon={faTimes} size='2x' /></div>
                    <h3>Select Category</h3>
                    {categoryList}
                </div>
            </div>
            <div className={classes.Sidebar}>
                <div className={classes.Section}>
                    <h3>Select Category</h3>
                    {categoryList}
                </div>
            </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
