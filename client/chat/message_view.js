import { Template } from 'meteor/templating';
import './messages.html';
import './messages.css';
// import { MessageController } from './message_controller'

class MessageController {
  constructor(user_id) {
    this.user_id = user_id;
  }

  get_messages() {
    return [
      { body: 'Hi', mine: false },
      { body: 'whadup?', mine: true },
      { body: 'I need binzin ASAHP!!!', mine: false },
      { body: 'Id rather go join the Schmekel', mine: true },
    ];
  }

  send_message(body) {

  }

  get_chatrooms() {

  }
}

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
    var from_user = Meteor.userId();
    var to_user = Router.current().params['user_id'];
    // console.log(to_user);
    var message_body = document.getElementById('send-message-input').value;
    console.log(message_body);
    ChatRooms.find().fetch();
    ChatMessages.insert({
      'from': from_user,
      'to': to_user,
      'body': message_body,
    })
  }
})