import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignIn from '../components/auth/signIn';
import SignUp from '../components/auth/signUp';
import { Accounts } from 'meteor/accounts-base';
import { browserHistory } from 'react-router';

class Home extends Component{
  constructor(props) {
    super(props);

    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
  }
  componentWillMount() {

  }

  signIn(e) {
    e.preventDefault();
    let { dispatch, form } = this.props;
    let user = {
      email: form.signIn.email.value,
      password: form.signIn.password.value
    }
    Meteor.loginWithPassword(user.email, user.password, function(err) {
      if(err) {
        alert(err)
      } else {
        dispatch({
          type: 'SET_USER',
          user: Meteor.user()
        });
        browserHistory.push('/welcome')
      }
    })
  }

  signUp(e) {
    e.preventDefault();
    let { dispatch, form } = this.props;
    let user = {
      email: form.signUp.email.value,
      password: form.signUp.password.value,
      profile: {
        firstName: form.signUp.firstName.value,
        lastName: form.signUp.lastName.value,
        zipCode: form.signUp.zip.value
      }
    }
    Accounts.createUser(user, function(err, res) {
      if(err) {
        console.log('error', err)
        alert('Error Signing Up')
      } else {
        browserHistory.push('/welcome')
        dispatch({
          type: 'SET_USER',
          user: Meteor.user()
        });
      }
    })



  }

  render() {
      return (
        <div>
          <SignIn signIn={this.signIn}/>
          <SignUp signUp={this.signUp} />
        </div>
      )

  }
}

function mapStateToProps(state) {
  return {
    form: state.form
  }
}

export default connect(mapStateToProps)(Home);
