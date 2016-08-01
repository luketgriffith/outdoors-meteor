import { Meteor } from 'meteor/meteor';
import '../imports/api/tasks.js';
import '../imports/api/experience.js';
import '../imports/api/reservations.js';
import { Email } from 'meteor/email'

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish("allUsers", function () {
    return Meteor.users.find({});
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

    getUserMail: function(id) {
      Meteor.users.findOne({ _id: id });
    }
});
