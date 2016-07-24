import * as constants from './constants';

const initialState = {
  experiences: [],
  singleExperience: {}
};

export default function authReducer(state=initialState, action={}) {
  switch(action.type) {
    case constants.GET_EXPERIENCES_SUCCESS:
      return { ...state, experiences: action.experiences }
    case constants.GET_SINGLE_EXPERIENCE_SUCCESS:
      return { ...state, singleExperience: action.experience }
    default:
      return state;
  }
}
