
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default class Main extends Component{
  componentWillMount() {
      // this.lock = new Auth0Lock(config.clientId, config.domain);
      // this.setState({idToken: this.getIdToken()})
  }


  render() {
    let user;
      if(!this.props.user.profile) {
        user = '!'
      } else {
        user = ' ' + this.props.user.profile.firstName + '!';
      }
      return (
        <div>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/welcome">Welcome{user}</Link>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav>
              <Link to="/welcome">Home</Link>
              <Link to="/createExperience">Create Experience</Link>

            </Nav>
          </Navbar>
            <div className="content-main">
            {this.props.children}
            </div>
          </div>
        )

  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(Main);
