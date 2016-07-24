import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from '../components/welcome/profile';

class Welcome extends Component {
  render(){
    return(
      <div>Welcome!</div>
      
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(Welcome);
