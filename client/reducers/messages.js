import * as constants from './constants';

const initialState = {
  messages: [],
  conversation: {
    visible: false,
    toMessages: [],
    fromMessages: [],
    message: ''
  }
};

export default function reservationReducer(state=initialState, action={}) {
  switch(action.type) {
    case constants.GET_MESSAGES_SUCCESS:
      return action.payload ? { ...state, messages: action.payload } : state;
    case constants.TYPE_MESSAGE:
      return action.payload ? { ...state, conversation: { ...state.conversation, message: action.payload } } : state;
    case constants.VIEW_CONVERSATION:
      return { ...state, conversation: { ...state.conversation, visible: !state.conversation.visible } };
    default:
      return state;
  }
}
