import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Main from './main';

export default createContainer(({ params }) => {
  const currentUser = Meteor.user();

  return {
    currentUser,
  };
}, Main);
