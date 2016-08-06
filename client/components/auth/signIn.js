import React, {Component} from 'react';
import {reduxForm} from 'redux-form';

class SignIn extends Component {
  render() {
    const {fields: {email, password}} = this.props;
    return (
      <div>
        <h4>Sign In</h4>
        <form onSubmit={this.props.signIn} className="form">
          <div>
            <label>Email</label>
            <input type="text" placeholder="Email" {...email}/>
          </div>
          <div>
            <label>Password</label>
            <input type="password" placeholder="Password" {...password}/>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

SignIn = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'signIn',                           // a unique name for this form
  fields: ['email', 'password'] // all the fields in your form
})(SignIn);

export default SignIn;
