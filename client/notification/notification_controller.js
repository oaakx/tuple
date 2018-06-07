
/* Routes */
Router.route('/notification',function(){
  this.render('topnavbar',{to: "header"});
  this.render('notification');
  var userID = this.params._id;
});

/* Handle notification actions : accept, reject  */
Template.notification.events({
  'click button':function(event){
    if ($(event.target).prop("id")=="accept"){
      event.preventDefault();
      if (!Meteor.user()) {
        alert("You need to be logged in");
        Router.go("login");
        return false;
      }
      var description = $(event.target).parent().children(".mt-2").attr("id");

      if (description.split(" ")[3]=="add"){
        var friend_left = description.split(" ")[0];
        var friend_right = Meteor.user().emails[0]["address"];
        Friends.insert({friend_left: friend_left, friend_right: friend_right});
        Friends.insert({friend_left: friend_right, friend_right: friend_left});
        Meteor.call('removeNotification', this.description, this.title, ( error )=>{
          if ( error ){
            console.log( error );
          }
        });
        return;
      }
      var user = Meteor.user().emails[0]["address"];
      var guest = this.description.split(" ")[0];

      Meteor.call('updateTuple', this.title, guest, ( error )=>{
        if ( error ){
          console.log( error );
        }
      });

      Meteor.call('removeNotification', this.description, this.title, ( error )=>{
        if ( error ){
          console.log( error );
        }
      });
    }else{
      return;
      Meteor.call('removeNotification', this.description, this.title, ( error )=>{
        if ( error ){
          console.log( error );
        }
      });
    }
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
      for (var i = 0; i<notifications.length; i++){
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
