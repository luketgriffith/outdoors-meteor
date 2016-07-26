import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateForm from '../components/experiences/createForm';

class CreateExp extends Component {
  constructor(props) {
    super(props)

    this.createExp = this.createExp.bind(this);
  }

  createExp(e) {
    e.preventDefault();
    let { dispatch, form } = this.props;
    dispatch({
      type: 'CREATE_EXP',
      payload: {
        title: form.title.value,
        description: form.description.value,
        user: Meteor.user()._id
      }
    })
  }

  render() {
    return(
      <div>
        <CreateForm createExp={this.createExp}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    form: state.form.createForm
  }
}

export default connect(mapStateToProps)(CreateExp)
