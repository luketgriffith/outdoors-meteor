import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from '../components/welcome/profile';
import { Experiences } from '../../imports/api/experience';
import { Link } from 'react-router';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import HoverExp from '../components/experiences/expHover';
import { browserHistory } from 'react-router';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.hover = this.hover.bind(this);
    this.showDetail = this.showDetail.bind(this);
    this.handleMarkerClose = this.handleMarkerClose.bind(this);
  }
  componentWillMount() {
    let { dispatch } = this.props;
    this.setState({
      showInfo: false
    });

    Meteor.call('getExpByLocation', function (err, res) {
      dispatch({
        type: 'GET_EXPERIENCES_SUCCESS',
        experiences: res
      });
    });
  }

  hover(marker) {
    let { dispatch, experiences } = this.props;
    let newArray = experiences.map((exp) => {
      if(exp._id === marker._id) {
        console.log('found it')
        newObj = {};
        Object.assign(newObj, exp)
        newObj.showInfo = true;
        return newObj;
      } else {
        return exp;
      }
    })

    console.log(newArray)
    dispatch({
      type: 'HOVER',
      payload: newArray
    });


  }


  showDetail(marker) {
    return(
      <InfoWindow
        onCloseclick={this.handleMarkerClose.bind(null, marker)}>
        <div>
          <h5 onClick={() => browserHistory.push("/experiences/" + marker._id)}>{marker.title}</h5>
          <h5>More info here</h5>
          <div className="imgRow">
            {marker.images.map((img)=>{
              return <img src={img.url} />
            })}
          </div>
        </div>
      </InfoWindow>
    )
  }

  handleMarkerClose(marker) {
    let { dispatch, experiences } = this.props;
    let newArray = experiences.map((exp) => {
      if(exp._id === marker._id) {
        newObj = {};
        Object.assign(newObj, exp)
        newObj.showInfo = false;
        return newObj;
      } else {
        return exp;
      }
    });

    dispatch({
      type: 'HOVER_CLOSE',
      payload: newArray
    });

  }

  render(){
    let exp;

    if(this.props.experiences.length > 0) {
      exp = this.props.experiences.map((exp) => {
        return <div key={exp._id}><Link to={"/experiences/" + exp._id }>{exp.title}</Link></div>
      })
    } else {
      exp = <div>Loading experiences...</div>
    }

    if(Meteor.user()){
      return(
        <div>
        <h4>Welcome!</h4>
        <HoverExp visible={this.state.visible} dismiss={this.dismiss}/>
        <div style={{ height: 1000 }} className="map">
        <GoogleMapLoader
        containerElement={
          <div style={{ height: `100%`  }} />
        }
        googleMapElement={
          <GoogleMap
          ref={(map) => console.log(map)}
          defaultZoom={5}
          defaultCenter={{ lat: Meteor.user() ? Meteor.user().profile.latitude : 35 , lng: Meteor.user() ? Meteor.user().profile.longitude : 88 }}
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
              onMouseover={this.hover.bind(null, marker)}>

              {marker.showInfo ? this.showDetail(marker) : null}


              </Marker>
            );
          })}
          </GoogleMap>
        }
        />
        </div>
        {exp}
        </div>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

function mapStateToProps(state) {
  console.log('state: ', state)
  return {
    user: state.auth.user,
    experiences: state.experiences.experiences
  }
}

export default connect(mapStateToProps)(Welcome);
