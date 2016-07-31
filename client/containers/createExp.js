import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateForm from '../components/experiences/createForm';
import Datetime from 'react-datetime';
import ExperienceActions from '../actions/experiences';

class CreateExp extends Component {
  constructor(props) {
    super(props)

    this.createExp = this.createExp.bind(this);
    this.blockDates = this.blockDates.bind(this);
  }

  createExp(e) {
    e.preventDefault();
    let { dispatch, form, dates } = this.props;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': form.address.value + ',' + form.city.value + ',' + form.state.value}, function(res, status) {
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
            user: Meteor.user()._id,
            dates: {
              unavailableDates: dates.unavailableDates
            }
          }
        })

      }
    })
  }

  blockDates(e) {
    let { dispatch } = this.props;
    console.log(e._d);
    let array = this.props.dates.unavailableDates.slice();
    array.push(e._d)
    dispatch(ExperienceActions.blockDates(array));
  }

  render() {
    return(
      <div>
        <CreateForm createExp={this.createExp} blockDates={this.blockDates}/>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    form: state.form.createForm,
    dates: state.experiences.singleExperience.dates
  }
}

export default connect(mapStateToProps)(CreateExp)
