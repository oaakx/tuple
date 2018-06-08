import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo'


/* Change password event handler */
Template.changepass.events({
    'submit form': function(event){
        event.preventDefault();
        var oldpass = $('[name=oldpass]').val();
        var newpass = $('[name=newpass]').val();
        Accounts.changePassword(oldpass,newpass, function(error) {
          if(error) {
            sAlert.error('Incorrect password!', {effect: 'slide', position: 'top-right', timeout: '3000', onRouteClose: false, stack: false, offset: '50px'});
            console.log(error.reason);
          } else {
            sAlert.success('You password has been changed!', {effect: 'slide', position: 'top-right', timeout: '3000', onRouteClose: false, stack: false, offset: '50px'});
            Meteor.logout()
            Router.go('profile'); //Need to enable going to the page where login_signup was triggered
          }
        });
    }
});

/* Logout handler */
Template.profile.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('profile');
    }
});


/* retrieve username */
Template.profile.helpers({
  'username': function(){
    return Meteor.user().emails[0]["address"];
  }
});

/* retrive tuples */

Template.mytuples.helpers({
  'tuples': function(){
      var url = location.href;
      if (!Meteor.user()) {
        sAlert.error("You need to be logged in");
        Router.go("login");
        return false;
      }
      var user = Meteor.user().emails[0]["address"];
      return tuplesList.find({creator: user}).fetch();
  }
});



/* Routes */

Router.route('/profile/settings',function(){
  this.render("topnavbar",{to:"header"});
  this.render("settings");
});

Router.route('/profile/mytuples',function(){
  this.render("browsebar",{to:"header"});
  this.render("mytuples");
})


Router.route('/profile',function(){
  this.render("topnavbar",{to:"header"});
  this.render("profile");
});
