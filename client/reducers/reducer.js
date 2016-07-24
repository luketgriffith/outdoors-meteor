import { combineReducers } from 'redux';
import HomeReducer from './homeReducer';
import {reducer as formReducer} from 'redux-form';
import AuthReducer from './authReducer';
import Location from './singleLocation';
//import reducers up here ...
//import reducer1 from la la la

export default combineReducers({
  home: HomeReducer,
  auth: AuthReducer,
  location: Location,
  form: formReducer
});
