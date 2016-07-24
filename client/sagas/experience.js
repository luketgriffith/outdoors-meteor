import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { Experiences } from '../../imports/api/experience';

function* getExp(action) {
  try {
    const exp = yield Experiences.find({}, { sort: { createdAt: -1 } }).fetch();
    console.log('wheeeeeee', exp)
    yield put({
      type: 'GET_EXPERIENCES_SUCCESS',
      experiences: exp
    })
  } catch(err) {
    //do something
    console.log('fatal error dude')
  }
}

export function* getExperiences() {
  yield* takeEvery('GET_EXPERIENCES', getExp)
}

export default function* homeSaga() {
  yield [
    getExperiences()
    // more sagas go here...
  ];
}
