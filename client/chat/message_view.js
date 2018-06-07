import { Template } from 'meteor/templating';
import './messages.html';
import './messages.css';
// import { MessageController } from './message_controller.js'

// var controller = new MessageController()

Router.route('/messages/:user_id', function() {
  // messages = controller.get_messages();
  this.render("topnavbar", {to: "header"});
  this.render("messages")
;});

Template.messages.helpers({
    messages: [
    { body: 'Hi', mine: false },
    { body: 'What\'s up?', mine: true },
    { body: 'I need binzin ASAP', mine: false },
    { body: 'Fuck off', mine: true },
  ]
})

Template.messages.events({
  'click #send-message-button': function(event) {
    event.preventDefault();
    var from_user = Meteor.user()._id;
    var to_user = Router.current().params['user_id'];
    // console.log(to_user);
    var message_body = document.getElementById('send-message-input').value;
    console.log(message_body);
  }
})