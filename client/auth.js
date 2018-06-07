import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './auth.html';
import { Mongo } from 'meteor/mongo'

Router.route('/register',function(){
  this.render("topnavbar",{to:"header"});
  this.render("register");
});

Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
            email: email,
            password: password
        }, function(error) {
          if(error) {
            console.log(error.reason);
          } else {
            Router.go("/"); //Need to enable going to the page where login_signup was triggered
          }
        });
    }
});

Template.profile.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('profile');
    }
});

Router.route('/login',function(){
  this.render("topnavbar",{to:"header"});
  this.render("login");
});

Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
    Meteor.loginWithPassword(email, password, function(error){
        if(error){
            console.log(error.reason);
        } else {
            Router.go("/");
        }
    });
    }
});

Router.route('/changepass',function(){
  ///this.render("topnavbar",{to:header});
  this.render("changepass");
});

Template.changepass.events({
    'submit form': function(event){
        event.preventDefault();
        var oldpass = $('[name=oldpass]').val();
        var newpass = $('[name=newpass]').val();
        Accounts.changePassword(oldpass,newpass, function(error) {
          if(error) {
            console.log(error.reason);
          } else {
            Meteor.logout()
            Router.go('profile'); //Need to enable going to the page where login_signup was triggered
          }
        });
    }
});
