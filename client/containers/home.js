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

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': form.signUp.address.value}, function(res, status) {
      if(status == 'OK') {
        let user = {
          email: form.signUp.email.value,
          password: form.signUp.password.value,
          profile: {
            firstName: form.signUp.firstName.value,
            lastName: form.signUp.lastName.value,
            address: form.signUp.address.value,
            latitude: res[0].geometry.viewport.f.b,
            longitude: res[0].geometry.viewport.b.b,
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
    })
  }

  render() {
      return (
        <div className="homePage">
          <h3>Outdoors</h3>
          <div className="signInForm col-md-6">
            <SignIn signIn={this.signIn}/>
          </div>
          <div className="signUpForm col-md-6">
            <SignUp signUp={this.signUp} />
          </div>
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
