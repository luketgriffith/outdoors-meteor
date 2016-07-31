import React from 'react';
import Main from './containers/main';
import Home from './containers/home';
import Welcome from './containers/welcome';
import SingleExperience from './containers/singleExperience';
import CreateExp from './containers/createExp';
import { Route, IndexRoute } from 'react-router';
import Reservation from './containers/reservation';


export default (
  <Route path="/" component={Main}>
    <IndexRoute component={Home} />
    <Route path="/welcome" component={Welcome} />
    <Route path="/experiences/:experienceId" component={SingleExperience} />
    <Route path="/createExperience" component={CreateExp} />
    <Reservation path="/reservation/:resId" component={Reservation} />
  </Route>
);
