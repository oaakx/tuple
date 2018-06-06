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
      return Notifications.find({user: user}).fetch();
  }
});

Template.notification.events({
  'click button':function(event){
    event.preventDefault();
    if (!Meteor.user()) {
      alert("You need to be logged in");
      Router.go("login");
      return false;
    }
    var user = Meteor.user().emails[0]["address"];
    Notifications.insert({
      title: "Sample Title",
      description: "You received a sample notification",
      type: "sample",
      read: false,
      user: user
    });
    return false;
  }
});
