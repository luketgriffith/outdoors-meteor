import * as constants from './constants';

const initialState = {
  user: {},
  location: {
    latitude: -80,
    longitude: 35
  }
};

export default function authReducer(state=initialState, action={}) {
  switch(action.type) {
    case constants.SET_USER:
      return { ...state, user: action.user };
    case constants.SET_LOCATION:
      return { ...state, location: action.payload };
    case constants.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
