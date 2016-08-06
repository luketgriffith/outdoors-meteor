import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { Experiences } from '../../imports/api/experience';
import { Reservations } from '../../imports/api/reservations';

function* confirmRes(action) {
  try {
    const res = yield Reservations.insert(action);
    yield Meteor.call('sendEmail', {
      to: action.payload.reservation.host.emails[0].address,
      from: 'Webmaster at GoFishCampHike',
      subject: 'Your experience was reserved!',
      text: action.payload.reservation.reservedBy.profile.firstName + action.payload.reservation.reservedBy.profile.lastName + ' has reserved your experience: ' + action.payload.reservation.experience.title + ' at : ' +
      action.payload.selectedDate + '. Please check your dashboard for more details.'
    });
    yield browserHistory.push('/welcome');
  } catch(err) {
    console.log('didnt work dude')
  }
}

function* reserve(action) {
  console.log(action)
  try {
    yield put({ type: 'RESERVE_EXP', payload: {
      experience: action.payload.experience,
      host: action.payload.experience.user,
      reservedBy: Meteor.user()
    }});
    yield browserHistory.push('/reservation');
  } catch(err) {
    alert('man sorry bout that, it didnt work')
    console.log('man thats the worst error')
  }
}

function* getExp(action) {
  try {

  } catch(err) {
    //do something
    console.log('fatal error dude')
  }
}

function* getSingleExp(action) {
  console.log('action: ', action)
  let expObj = {}
  try{
    const exp = yield Experiences.find({ _id: action.payload._id }).fetch();
    console.log('exp: ', exp)
    const user = yield Meteor.users.find({ _id: exp[0].user }).fetch();
    console.log('user: ', user)
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

export function* watchConfirm() {
  yield* takeEvery('CONFIRM_RES', confirmRes)
}

export default function* homeSaga() {
  yield [
    getExperiences(),
    watchGetSingleExp(),
    watchCreate(),
    watchReserve(),
    watchConfirm()
    // more sagas go here...
  ];
}
