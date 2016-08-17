import { Meteor } from 'meteor/meteor';
// import { Accounts } from 'meteor/accounts-base';
import '../imports/api/tasks.js';
import { Experiences } from '../imports/api/experience.js';
import { Reservations } from '../imports/api/reservations.js';
import { Messages } from '../imports/api/messages.js';
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
  newRes: function(res) {
    Reservations.insert(res);
    let exp = Experiences.findOne({ _id: res.experience });
    exp.dates.unavailableDates.push(res.date);
    Experiences.update({ _id: res.experience }, {$set: { dates: { unavailableDates: exp.dates.unavailableDates } }});
    return exp;
  },

  sendEmail: function (mailFields) {
        Meteor.Mailgun.send({
            to: mailFields.to,
            from: mailFields.from,
            subject: mailFields.subject,
            text: mailFields.text
        });
        console.log("email sent!");
    },

    sendVerificationLink() {
      let userId = Meteor.userId();
      if ( userId ) {
        return Accounts.sendVerificationEmail( userId );
      }
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
    },

    sendMessage: function(msg) {
      console.log('to: ', msg.to)
      console.log('owner: ', msg.owner)
      console.log('message: ', msg.message)
      let newMsg = {
        to: msg.to,
        owner: msg.owner,
        message: msg.message
      }
      Messages.insert(newMsg)
    }

});
