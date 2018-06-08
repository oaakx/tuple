import { Mongo } from 'meteor/mongo'

/* === New Chatroom === */

Router.route('/chat/user/:email', function() {
  let friend_email = Route.current().params['email'];
  let my_email = Meteor.user().emails[0].address;
  let chatroom = ChatRooms.findOne({members: {'$all': [my_email, friend_email]}});

  if (chatroom == undefined) {
    console.log('chatroom not found...');
    // ChatRooms.insert({members: [my_email, friend_email]}, (err, inserted) => {
    //   let room_id = inserted;
    //   console.log('new room created: ' + inserted)
    //   Router.go('/chat/room/' + room_id);
    // });
  } else {
    let room_id = chatroom._id;
    console.log('going to room: ' + room_id);
    Router.go('/chat/room/' + room_id);
  }
});

Router.route('/chat/new', function() {
  this.render("chat-topbar", {to: "header"});
  this.render("new-chatroom");
});

Template['new-chatroom'].events({
  'submit #new-chatroom': (event) => {
    event.preventDefault();
    
    let target = event.target;
    let friend_email = target['friend-email'].value;
    let my_email = Meteor.user().emails[0].address;
    let chatroom = ChatRooms.findOne({members: {'$all': [my_email, friend_email]}});

    if (chatroom == undefined) {
      ChatRooms.insert({members: [my_email, friend_email]}, (err, inserted) => {
        let room_id = inserted;
        console.log('new room created: ' + inserted)
        Router.go('/chat/room/' + room_id);
      });
    } else {
      let room_id = chatroom._id;
      Router.go('/chat/room/' + room_id);
    }
  }
});

/* === All Chatrooms === */

Template['all-chatrooms'].helpers({
  chatrooms: function() {
    let my_email = Meteor.user().emails[0].address;
    let chatrooms = ChatRooms.find({members: {'$in': [my_email]}}).fetch();

    // remove my email from chatroom members
    chatrooms.forEach((chatroom, index, chatrooms) => {
      members = [];
      for (let index in chatroom.members) {
        email = chatroom.members[index];
        if (email != my_email) {
          members.push(email)
        }
      }
      
      chatrooms[index].members = members;
      chatrooms[index].title = members.join(', ');
    });

    return chatrooms;
  }
});

Router.route('/chat/rooms', function() {
  this.render("chat-topbar", {to: "header"});
  this.render("all-chatrooms");
});

/* === Single Chatroom === */

Router.route('/chat/room/:room_id', function() {
  // messages = controller.get_messages();
  this.render("chatroom-topbar", {to: "header"});
  this.render("chatroom");
});

Template.chatroom.helpers({
  chatroom: () => {
    let room_id = Router.current().params['room_id'];
    let chatroom = ChatRooms.findOne(room_id);
    let my_email = Meteor.user().emails[0].address;
    members = [];
    for (let index in chatroom.members) {
      email = chatroom.members[index];
      if (email != my_email) {
        members.push(email)
      }
    }
    chatroom.members = members;
    chatroom.title = members.join(', ');

    return chatroom;
  },
  messages: () => {
    let room_id = Router.current().params['room_id'];
    let messages = ChatMessages.find({room_id: room_id}).fetch();
    return messages;
  },
  isme: (author) => {
    me = Meteor.user().emails[0].address;
    return author == me;
  },
});

Template.chatroom.events({
  'submit #send-message-form': function(event) {
    event.preventDefault();

    let target = event.target;
    let room_id = Router.current().params['room_id'];
    let author = Meteor.user().emails[0].address;
    let body = target['message-body'].value;
    ChatMessages.insert({
      room_id: room_id,
      author: author,
      body: body,
    });
    target['message-body'].value = '';
  },
});