import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from '../components/welcome/profile';
import { Experiences } from '../../imports/api/experience';
import { Link } from 'react-router';
import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.hover = this.hover.bind(this);
  }
  componentWillMount() {
    let { dispatch } = this.props;
    Meteor.call('getExpByLocation', function (err, res) {
      dispatch({
        type: 'GET_EXPERIENCES_SUCCESS',
        experiences: res
      });
    });
  }

  hover() {
    console.log('lsdjfl;sajkdf')
    //display the experience on hover
  }

  render(){
    let exp;

    if(this.props.experiences.length > 0) {
      exp = this.props.experiences.map((exp) => {
        console.log(exp);
        return <div key={exp._id}><Link to={"/experiences/" + exp._id }>{exp.title}</Link></div>
      })
    } else {
      exp = <div>Loading experiences...</div>
    }

    return(
      <div>
      <h4>Welcome!</h4>
      <div style={{ height: 300 }} className="map">
        <GoogleMapLoader
          containerElement={
            <div style={{ height: `100%`  }} />
          }
          googleMapElement={
            <GoogleMap
              ref={(map) => console.log(map)}
              defaultZoom={5}
              defaultCenter={{ lat: Meteor.user().profile.latitude, lng: Meteor.user().profile.longitude }}
            >
            {this.props.experiences.map((marker, index) => {
              let pos = {
                lat: marker.latitude,
                lng: marker.longitude
              }
              return (
                <Marker
                  position={pos}
                  key={marker._id}
                  onMouseover={this.hover}

                />
              );
            })}
            </GoogleMap>
          }
        />
      </div>
      {exp}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    experiences: state.experiences.experiences
  }
}

export default connect(mapStateToProps)(Welcome);
