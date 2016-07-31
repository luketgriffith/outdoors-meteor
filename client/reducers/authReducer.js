import * as constants from './constants';

const initialState = {
  user: {}
};

export default function authReducer(state=initialState, action={}) {
  switch(action.type) {
    case constants.SET_USER:
      return { ...state, user: action.user };
    case constants.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
