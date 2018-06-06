Router.route('/profile',function(){
  this.render("topnavbar",{to:"header"});
  this.render("profile");
});

Template.profile.helpers({
  'username': function(){
    return Meteor.user().emails[0]["address"];
  }
});
