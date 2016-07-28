import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { Experiences } from '../../imports/api/experience';

import superagent from 'superagent';



function* getExp(action) {
  try {
    const exp = yield Experiences.find({}, { sort: { createdAt: -1 } }).fetch();
    yield put({
      type: 'GET_EXPERIENCES_SUCCESS',
      experiences: exp
    })
  } catch(err) {
    //do something
    console.log('fatal error dude')
  }
}

function* getSingleExp(action) {
  let expObj = {}
  try{
    const exp = yield Experiences.find({ _id: action.payload._id }).fetch();
    console.log(exp)
    const user = yield Meteor.users.find({ _id: exp[0].user }).fetch();
    console.log(user);
    Object.assign(expObj, exp[0]);
    expObj.user = user[0];
    yield put({
      type: 'GET_SINGLE_EXPERIENCE_SUCCESS',
      experience: expObj
    })
  } catch(err) {
    console.log('fatal error duuuuude')
  }
}

function* createExp(action) {
  try {
    // const geocoded = yield call(geocode, action.payload)
    // console.log('wat wat wat: ', geocoded)
    const exp = yield Experiences.insert(action.payload)
    browserHistory.push('/welcome')
  } catch(err) {
    console.log('horrible error man, sorry')
  }
}

export function* getExperiences() {
  yield* takeEvery('GET_EXPERIENCES', getExp)
}

export function* watchGetSingleExp() {
  yield* takeEvery('GET_SINGLE_EXPERIENCE', getSingleExp)
}

export function* watchCreate() {
  yield* takeEvery('CREATE_EXP', createExp)
}
export default function* homeSaga() {
  yield [
    getExperiences(),
    watchGetSingleExp(),
    watchCreate()
    // more sagas go here...
  ];
}
