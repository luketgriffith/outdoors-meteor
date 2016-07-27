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
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': form.address.value + ',' + form.city.value + ',' + form.state.value}, function(res, status) {
      console.log('google: ', res)
      console.log('status: ', status)
      if(status == 'OK') {
        dispatch({
          type: 'CREATE_EXP',
          payload: {
            title: form.title.value,
            description: form.description.value,
            address: form.address.value,
            city: form.city.value,
            state: form.state.value,
            zip: form.zip.value,
            long: res[0].geometry.viewport.b.b,
            lat: res[0].geometry.viewport.f.b,
            user: Meteor.user()._id
          }
        })

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
