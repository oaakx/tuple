/* === New Chatroom === */

Router.route('/chat/user/:email', function() {
  this.render('topnavbar', {to: 'header'});
  this.render('chat-user-redirect');
});

Template['chat-user-redirect'].helpers({
  done: function() {
    let friend_email = Router.current().params['email'];
    let my_email = Meteor.user().emails[0].address;
    let chatroom = ChatRooms.findOne({members: {'$all': [my_email, friend_email]}});

    console.log(friend_email);
    console.log(my_email);

    if (chatroom == undefined) {
      console.log('chatroom not found...');
      ChatRooms.insert({members: [my_email, friend_email]}, (err, inserted) => {
        let room_id = inserted;
        console.log('new room created: ' + inserted)
        Router.go('/chat/room/' + room_id);
      });
    } else {
      let room_id = chatroom._id;
      console.log('going to room: ' + room_id);
      Router.go('/chat/room/' + room_id);
    }

    return 'redirecting...';
  }
})

Router.route('/chat/new', function() {
  this.render("chat-topbar", {to: "header"});
  this.render("new-chatroom");
});

/* === All Chatrooms === */
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
});

Template.chatroom.helpers({
  chatroom: () => {
    let room_id = Router.current().params['room_id'];
    let chatroom = ChatRooms.findOne(room_id);
    let my_email = Meteor.user().emails[0].address;

    if(chatroom.title === "") {
      members = [];
      for (let index in chatroom.members) {
        email = chatroom.members[index];
        if (email != my_email) {
          members.push(email)
        }
        chatroom.title = members.join(', ');
      }
    }
    
    return chatroom;
  },
  messages: () => {
    let room_id = Router.current().params['room_id'];
    let messages = ChatMessages.find({room_id: room_id}).fetch();
    return messages;
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


Router.route('/chat/rooms', function() {
  this.render("topnavbar", {to: "header"});
  this.render("all-chatrooms");
});

/* === Single Chatroom === */
Router.route('/chat/room/:room_id', function() {
  this.render("chatroom-topbar", {to: "header"});
  this.render("chatroom");
});
