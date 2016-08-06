import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reducer from './reducers/reducer';
import rootSaga from './sagas/index';

import Main from './containers/main';
import Home from './containers/home';
import Welcome from './containers/welcome';
import SingleExperience from './containers/singleExperience';
import CreateExp from './containers/createExp';
import { Route, IndexRoute } from 'react-router';
import Reservation from './containers/reservation';






const sagaMiddleware = createSagaMiddleware();
const store = compose(
   applyMiddleware(sagaMiddleware),
   window.devToolsExtension ? window.devToolsExtension() : f => f,
)(createStore)(reducer);

// Run sagas
sagaMiddleware.run(rootSaga);

Meteor.startup(() => {
  Meteor.subscribe('allUsers');

  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory} >
        <Route path="/" component={Home}/>
        <Route component={Main}>
          <Route path="/welcome" component={Welcome} />
          <Route path="/experiences/:experienceId" component={SingleExperience} />
          <Route path="/createExperience" component={CreateExp} />
          <Reservation path="/reservation" component={Reservation} />
        </Route>
      </Router>
    </Provider>
    , document.getElementById('app'));
})
