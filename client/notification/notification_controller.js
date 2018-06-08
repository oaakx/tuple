
/* Routes */
Router.route('/notification',function(){
  this.render('topnavbar',{to: "header"});
  this.render('notification');
});

/* Handle notification actions : accept, reject  */
Template.notification.events({
  'click button':function(event){
    var description = $(event.target).parent().children(".mt-2").attr("id");
    if ($(event.target).prop("id")=="friend_request"){
      event.preventDefault();
      if (!Meteor.user()) {
        sAlert.error("You need to be logged in");
        Router.go("login");
        return false;
      }

      var friend_left = description.split(" ")[0];
      var friend_right = Meteor.user().emails[0]["address"];
      Friends.insert({friend_left: friend_left, friend_right: friend_right});
      Friends.insert({friend_left: friend_right, friend_right: friend_left});
      ChatRooms.insert({
        title: "",
        type: "__friend__",
        members: [friend_left,friend_right],
        messages: []
      });
      Notifications.insert({
        title: this.title,
        description: friend_left + " is now your friend." ,
        type: "normal",
        read: false,
        user: friend_right
      });
      Notifications.insert({
        title: this.title,
        description: friend_right + " has accepted your request." ,
        type: "normal",
        read: false,
        user: friend_left
      });
    }else if($(event.target).prop("id")=="join_request"){
      var user = Meteor.user().emails[0]["address"];
      var guest = this.description.split(" ")[0];


      Meteor.call('updateTuple', this.title, guest, ( error )=>{
        if ( error ){
          console.log( error );
        }else{
          var description = $(event.target).parent().children(".mt-2").attr("id");
          
          var the_tuple = ChatRooms.findOne({title: this.title, type: "__tuple__"});          
          var old_tuple_id = ChatRooms.findOne({title: this.title, type: "__tuple__"})._id;
          var tuple_members = the_tuple.members;
          var messages = the_tuple.messages;
          tuple_members.push(description.split(" ")[0]);

          ChatRooms.remove(old_tuple_id);
          ChatRooms.insert({
            title: this.title,
            type: "__tuple__",
            members: tuple_members,
            messages: messages
          });          

          // console.log(this.title);


          Notifications.insert({
            title: this.title,
            description: "Creator has accepted your request. Congrats!" ,
            type: "normal",
            read: false,
            user: description.split(" ")[0]
          });
        }
      });
    }
    var user = Meteor.user().emails[0]["address"];
    Meteor.call('removeNotification', this.description, this.title , ( error )=>{
      if ( error ){
        console.log( error );
      }
    });
    return false;
  }
});

/* Retrieve the notification of a user */
Template.notification.helpers({
  'notifs': function(){
      var url = location.href;
      if (!Meteor.user()) {
        alert("You need to be logged in");
        Router.go("login");
        return false;
      }
      var user = Meteor.user().emails[0]["address"];
      var notifications = Notifications.find({user: user}).fetch();
      var arrayOfNot = []
      for (var i = 0; i < notifications.length; i++){
        var notification = notifications[i];
        var guest = notification.description.split(" ")[0];
        if (guest=="You"){
          continue;
        }
        arrayOfNot.push(notification);
      }

      return arrayOfNot;
  }
});

// check if notif is normal type
Template.notification.helpers({
  not_normal: function (type) {
    return type !== "normal";
  }
});
