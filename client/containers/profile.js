import React, { Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component {
  componentWillMount() {
    let { dispatch, user } = this.props;
    dispatch({
      type: 'GET_USER_EXP',
      user: user._id
    });
    dispatch({
      type: 'GET_USER_LISTINGS',
      user: user._id
    })
  }

  render() {

    let expSection;
    if(this.props.experiences && this.props.experiences.length > 0) {
      expSection = this.props.experiences.map((exp) => {
        return (
          <div className="exp-profile" key={exp.reservationId}>
            <h5>{exp.title}</h5>
            <div className="profile-exp-img">
              {exp.images.map((img) => {
                return <img src={img.url} style={{ width: 300 }}/>
              })}
            </div>
          </div>
        )
      })
    } else {
      expSection = <p>You havent booked any experiences yet!</p>
    }

    let listings;
    if(this.props.listings && this.props.listings.length > 0) {
      listings = this.props.listings.map((listing) => {
        return (
          <div>
            <h4>{listing.title}</h4>
          </div>
        )
      })
    } else {
      listings = <div>You dont have any listings yet!</div>
    }

    return(
      <div>
        <div>
          <h4>Profile Info</h4>
          <span>{Meteor.user() ? Meteor.user().profile.firstName : 'Loading...'}</span>
        </div>
        <div>
          <h4>My Experiences</h4>
          <span>These are the experiences that you have participated in. Book them again, or leave a rating!</span>
            {expSection}
        </div>

        <div>
          <h4>My Listings</h4>
          {listings}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    experiences: state.auth.userExp,
    listings: state.auth.userListings
  }
}

export default connect(mapStateToProps)(Profile)
