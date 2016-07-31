import { Meteor } from 'meteor/meteor';
import '../imports/api/tasks.js';
import '../imports/api/experience.js';
import '../imports/api/reservations.js';
import { Email } from 'meteor/email'

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  sendEmail: function (to, from, subject, text) {
    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });
  }
});
