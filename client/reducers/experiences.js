import * as constants from './constants';

const initialState = {
  experiences: []
};

export default function authReducer(state=initialState, action={}) {
  switch(action.type) {
    case constants.GET_EXPERIENCES_SUCCESS:
      return { ...state, experiences: action.experiences }
    default:
      return state;
  }
}
