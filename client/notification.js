Router.route('/notification',function(){
  this.render('topnavbar',{to: "header"});
  this.render('notification');

  var userID = this.params._id;
});

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

Template.notification.events({
  'click button':function(event){
    if ($(event.target).prop("id")=="accept"){
      event.preventDefault();
      if (!Meteor.user()) {
        alert("You need to be logged in");
        Router.go("login");
        return false;
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















