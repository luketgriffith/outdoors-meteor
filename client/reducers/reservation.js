import * as constants from './constants';

const initialState = {
  selectedDate: ''
};

export default function reservationReducer(state=initialState, action={}) {
  switch(action.type) {
    case constants.SELECT_DATE:
      return { ...state, selectedDate: action.payload };
    default:
      return state;
  }
}
