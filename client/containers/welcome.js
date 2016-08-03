import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from '../components/welcome/profile';
import { Experiences } from '../../imports/api/experience';
import { Link } from 'react-router';

class Welcome extends Component {
  componentWillMount() {
    let { dispatch } = this.props;
    Meteor.call('getExpByLocation', function (err, res) {
      dispatch({
        type: 'GET_EXPERIENCES_SUCCESS',
        experiences: res
      });
    });
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
