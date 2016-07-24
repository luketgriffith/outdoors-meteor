import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reducer from './reducers/reducer';
// import rootSaga from './sagas/index';
const sagaMiddleware = createSagaMiddleware();
const store = compose(
   applyMiddleware(sagaMiddleware),
   window.devToolsExtension ? window.devToolsExtension() : f => f,
)(createStore)(reducer);

// Run sagas
// sagaMiddleware.run(rootSaga);

Meteor.startup(() => {
  ReactDOM.render(
    <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
    </Provider>
    , document.getElementById('app'));
})
