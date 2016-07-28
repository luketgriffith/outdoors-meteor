
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
                <a href="/welcome">Welcome{user}</a>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav>
              <NavItem href="/welcome">Home</NavItem>
              <NavItem href="/createExperience">Create Experience</NavItem>

            </Nav>
          </Navbar>
          {this.props.children}
          </div>
        )

  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(Main);
