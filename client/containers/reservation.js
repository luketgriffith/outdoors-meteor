import React, { Component } from 'react';
import { connect } from 'react-redux';

class Reservation extends Component {
  render() {
    return(
      <div>Reservation</div>

    )
  }
}

function mapStateToProps(state) {
  return {
    
  }
}

export default connect(mapStateToProps)(Reservation);
