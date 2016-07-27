import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { Experiences } from '../../imports/api/experience';
import superagent from 'superagent';

// function geocode(data) {
//   console.log(data)
//    let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + data.address + ',+' + data.state + '&key=AIzaSyCUn8eTwy5nXeA-S9KUl3XCGfr_rr3ZSTc';
//    console.log(url);
//    return new Promise((resolve, reject) => {
//      superagent
//       .get(url)
//       .end(function(err, res) {
//         console.log('sdddfddfdf', err)
//       })
//   })
// }

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
    // const geocoded = yield call(geocode, action.payload)
    // console.log('wat wat wat: ', geocoded)
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
