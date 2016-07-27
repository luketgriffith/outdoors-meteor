import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Experiences } from '../../imports/api/experience';
import { Link } from 'react-router';
// import Map from '../components/maps/map';
// import { GoogleMap } from "react-google-maps";
import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";


class SingleExperience extends Component {
  componentWillMount() {
    let { dispatch, params } = this.props;
    dispatch({
      type: 'GET_SINGLE_EXPERIENCE',
      payload: {
        _id: params.experienceId
      }
    })
  }

  render(){
    let exp;
    if(this.props.experiences.singleExperience.length > 0) {
      let lat = this.props.experiences.singleExperience[0].lat;
      let long = this.props.experiences.singleExperience[0].long;

      exp = (
        <div style={{ height: 500 }}>
          <h4>{this.props.experiences.singleExperience[0].name}</h4>
          <GoogleMapLoader
            containerElement={
              <div style={{ height: `100%`  }} />
            }
            googleMapElement={
              <GoogleMap
                ref={(map) => console.log(map)}
                defaultZoom={12}
                defaultCenter={{ lat: lat, lng: long }}
              >
              </GoogleMap>
            }
          />
        </div>
        )
    } else {
      exp = <div>Loading...</div>
    }

    return(
      <div>
      {exp}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    experiences: state.experiences
  }
}

export default connect(mapStateToProps)(SingleExperience);
