import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from '../components/welcome/profile';
import { Experiences } from '../../imports/api/experience';

class Welcome extends Component {
  componentWillMount() {
    let { dispatch } = this.props;
    dispatch({
      type: 'GET_EXPERIENCES',
      payload: 'nothing right now'
    })
  }

  render(){
    let exp;

    if(this.props.experiences.length > 0) {
      exp = this.props.experiences.map((exp) => {
        return <div key={exp._id}>{exp.name}</div>
      })
    } else {
      exp = <div></div>
    }

    return(
      <div>
      <h4>Welcome!</h4>
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
