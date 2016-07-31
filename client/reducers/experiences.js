import * as constants from './constants';

const initialState = {
  experiences: [],
  singleExperience: {
    _id: '',
    user: {},
    dates: {
      unavailableDates: [],
      selectedDate: ''
    }
  }
};

export default function authReducer(state=initialState, action={}) {
  switch(action.type) {
    case constants.GET_EXPERIENCES_SUCCESS:
      return { ...state, experiences: action.experiences }
    case constants.GET_SINGLE_EXPERIENCE_SUCCESS:
      return { ...state, singleExperience: action.experience }
    case constants.BLOCK_DATE:
      return { ...state, singleExperience: { ...state.singleExperience, dates: { ...state.singleExperience.dates, unavailableDates: action.payload } }  }
    default:
      return state;
  }
}
