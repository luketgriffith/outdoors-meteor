import React, {Component} from 'react';
import {reduxForm} from 'redux-form';

class CreateForm extends Component {
  render() {
    const {fields: {title, description}} = this.props;
    return (
      <div>
        <h4>Create Experience</h4>
        <form onSubmit={this.props.createExp}>
          <div>
            <label>Title</label>
            <input type="text" placeholder="Title" {...title}/>
          </div>
          <div>
            <label>Description</label>
            <textarea type="text" placeholder="Description" {...description}/>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

CreateForm = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'createForm',                           // a unique name for this form
  fields: ['title', 'description'] // all the fields in your form
})(CreateForm);

export default CreateForm;
