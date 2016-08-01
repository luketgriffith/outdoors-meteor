import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { Experiences } from '../../imports/api/experience';
import { Reservations } from '../../imports/api/reservations';


import superagent from 'superagent';



function* reserve(action) {
  try {
    console.log('action: ', action)
    let mailTo = Meteor.users.find({ _id: action.payload.experience.user._id }).fetch();
    // yield Meteor.call('getUserMail', action.payload.experience.user._id, (res) => {
    //   console.log('found it: ', res)
    // })
    console.log('mailTo: ', mailTo)
    const res = yield Reservations.insert(action);
    // yield browserHistory.push('/reservation/' + res)
    yield Meteor.call('sendEmail', {
    to: mailTo[0].emails[0].address,
    from: 'Webmaster at GoFishCampHike',
    subject: 'Your experience was reserved!',
    text: 'User ' + action.payload.user.emails[0].address + ' has reserved your experience' + action.payload.experience.title + 'for ' + action.payload.date + '.'
  });
  } catch(err) {
    alert('man sorry bout that, it didnt work')
    console.log('man thats the worst error')
  }
}

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
    const user = yield Meteor.users.find({ _id: exp[0].user }).fetch();
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

export function* watchReserve() {
  yield* takeEvery('RESERVE', reserve)
}

export default function* homeSaga() {
  yield [
    getExperiences(),
    watchGetSingleExp(),
    watchCreate(),
    watchReserve()
    // more sagas go here...
  ];
}
