import { Meteor } from 'meteor/meteor';
import '../imports/api/tasks.js';
import { Experiences } from '../imports/api/experience.js';
import '../imports/api/reservations.js';
import { Email } from 'meteor/email'
import geolib from 'geolib';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish("allUsers", function () {
    return Meteor.users.find({});
  });

  Meteor.publish("allExp", function () {
    return Experiences.find({});
  });
});




Meteor.methods({
  sendEmail: function (mailFields) {
        Meteor.Mailgun.send({
            to: mailFields.to,
            from: mailFields.from,
            subject: mailFields.subject,
            text: mailFields.text
        });
        console.log("email sent!");
    },

    getUser: function() {
      return Meteor.user();
    },

    getExpByLocation: function(location) {
      let exp = Experiences.find({}).fetch();
      let newArray = exp.map(function(experience){
        let user = {
          latitude: Meteor.user().profile.latitude,
          longitude: Meteor.user().profile.longitude
        }

        let distance = geolib.getDistance(
          user, {
            latitude: experience.latitude,
            longitude: experience.longitude
          });

        let newExp = {};
        Object.assign(newExp, experience);
        newExp.distance = distance;
        return newExp
      })

      newArray.sort(function(a, b) {
        return a.distance - b.distance
      });

      return newArray;
    }

});
