/* === All chatrooms === */

Router.route('/chat/user/:email', function() {
  // redirect to proper chat
});


Router.route('/messages', function() {
  this.render("chat-topbar", {to: "header"});
  this.render("all-chatrooms");
});

Template['all-chatrooms'].helpers({
  'chatrooms': function() {
    console.log(Meteor.user())
    let my_email = Meteor.user().emails[0].address;
    let chatrooms = ChatRooms.find({members: {'$in': [my_email]}}).fetch()
    return chatrooms;
  },
  not_me: function (email) {
    if(email[0] !== Meteor.user().emails[0].address )
      return email[0];
    return email[1];
  },
  tuple_chat: function (title) {
    return title !== "";
  }

});1

// /* === A chatroom === */
//
// Router.route('/chat/room/:room_id', function() {
//   // messages = controller.get_messages();
//   this.render("chatroom-topbar", {to: "header"});
//   this.render("chatroom");
// });
//
// Template.chatroom.helpers({
//   chatroom: () => {
//     let room_id = Router.current().params['room_id'];
//     let chatroom = ChatRooms.findOne(room_id);
//     return chatroom;
//   },
//   messages: () => {
//     let room_id = Router.current().params['room_id'];
//     let messages = ChatMessages.find({room_id: room_id}).fetch();
//     return messages;
//   },
//   isme: (author) => {
//     me = Meteor.user().emails[0].address;
//     return author == me;
//   },
// });
//
// Template.chatroom.events({
//   'submit #send-message-form': function(event) {
//     event.preventDefault();
//
//     let target = event.target;
//     let room_id = Router.current().params['room_id'];
//     let author = Meteor.user().emails[0].address;
//     let body = target['message-body'].value;
//     ChatMessages.insert({
//       room_id: room_id,
//       author: author,
//       body: body,
//     });
//     target['message-body'].value = '';
//   },
// });
