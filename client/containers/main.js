
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

export default class Main extends Component{
  componentWillMount() {
      // this.lock = new Auth0Lock(config.clientId, config.domain);
      // this.setState({idToken: this.getIdToken()})
  }


  render() {
    let user;
      if(!this.props.user.profile) {
        user = ''
      } else {
        user = 'Signed In: ' + this.props.user.profile.firstName;
      }
      return (
        <div>
          <div>Top Bar Nav. {user}</div>
          <div>Links:
            <Link to="/createExperience">Create Experience</Link>
          </div>
          {this.props.children}
        </div>)

  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(Main);
