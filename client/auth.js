import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './auth.html';
import { Mongo } from 'meteor/mongo'

//Comments functionality here


//





//REGISTER AND LOGIN FUNCTIONALITY HERE

Router.route('/register', {
  name: 'register',
  template: 'register'
});


Router.route('/login', {
  name: 'login',
  template: 'login'
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
