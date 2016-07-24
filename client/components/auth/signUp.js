import React, {Component} from 'react';
import {reduxForm} from 'redux-form';

class SignUp extends Component {
  render() {
    const {fields: {email, password, firstName, lastName, zip}} = this.props;
    return (
      <div>
      <h4>Sign Up</h4>
      <form onSubmit={this.props.signUp}>
        <div>
          <label>Email</label>
          <input type="text" placeholder="Email" {...email}/>
        </div>
        <div>
          <label>Password</label>
          <input type="password" placeholder="password" {...password}/>
        </div>
        <div>
          <label>First Name</label>
          <input type="text" placeholder="First Name" {...firstName}/>
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" placeholder="Last Name" {...lastName}/>
        </div>
        <div>
          <label>Zip Code</label>
          <input type="text" placeholder="Zip Code" {...zip} />
        </div>
        <button type="submit">Submit</button>
      </form>
      </div>
    );
  }
}

SignUp = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'signUp',                           // a unique name for this form
  fields: ['email', 'password', 'firstName', 'lastName', 'zip'] // all the fields in your form
})(SignUp);

export default SignUp;
