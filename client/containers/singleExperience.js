import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Experiences } from '../../imports/api/experience';
import { Link } from 'react-router';

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
      exp = <h4>{this.props.experiences.singleExperience[0].name}</h4>
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
