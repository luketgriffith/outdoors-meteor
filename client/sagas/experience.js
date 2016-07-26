import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { Experiences } from '../../imports/api/experience';

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
  try{
    const exp = yield Experiences.find({ _id: action.payload._id }).fetch();
    console.log('yay: ', exp)
    yield put({
      type: 'GET_SINGLE_EXPERIENCE_SUCCESS',
      experience: exp
    })
  } catch(err) {
    console.log('fatal error duuuuude')
  }
}

function* createExp(action) {
  try {
    const exp = yield Experiences.insert(action.payload)
    console.log('yay', exp)
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
