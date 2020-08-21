import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

class Home extends Component {
    render() {
        if(this.props.role === 'admin'){
            return <Redirect to='/admin/home' />
        }
        return (
            <div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        role : state.loginReducer.userDetails.role
    }
}

export default connect(mapStateToProps)(Home);