import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { Experiences } from '../../imports/api/experience';
import { Messages } from '../../imports/api/messages';
import { Reservations } from '../../imports/api/reservations';

function* getMsg(action) {
  try{
    let msg = yield Messages.find({ to: action.user }).fetch()
    let sent = yield Messages.find({ owner: action.user }).fetch()
    yield put({
      type: 'GET_MESSAGES_SUCCESS',
      payload: {
        received: msg,
        sent: sent
      }
    });
  } catch(err) {
    console.log('AHHHHH no')
  }
}


export function* getMessages() {
  yield* takeEvery('GET_USER_MESSAGES', getMsg)
}

export default function* messageSaga() {
  yield [
    getMessages()
    // more sagas go here...
  ];
}
