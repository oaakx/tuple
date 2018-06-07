import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo'

/* Routes */
Router.route('/login',function(){
  this.render("topnavbar",{to:"header"});
  this.render("login");
});

Router.route('/register',function(){
  this.render("topnavbar",{to:"header"});
  this.render("register");
});

Router.route('/changepass',function(){
  this.render("topnavbar",{to:"header"});
  this.render("changepass");
});

Router.route('/resetpass',function(){
  this.render("add_friend_navbar",{to:"header"});
  this.render("resetpass");
});

/* Registration event handler */
Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();

        // check if its unused kaist email
        if(!email.endsWith("@kaist.ac.kr")){
          sAlert.error("Only KAIST emails are allowed.")
          return;
        }else{
          Meteor.call('registeredEmail', email, (error)=>{
            if ( error ){
              Accounts.createUser({
                email: email,
                password: password
              }, function(error) {
                if(error) {
                  sAlert.error("Failed to create user!")
                } else {
                  sAlert.success('Welcome to KAIST_TUPLE!');
                  Router.go("/"); //Need to enable going to the page where login_signup was triggered
                }
              });
            }else{
              sAlert.error("This email is already registered.");
              return;
            }});
        }
    }
});

/* Login event handler */

Template.login.events({
  'submit form': function(event){
    event.preventDefault();
    var email = $('[name=email]').val();
    var password = $('[name=password]').val();
    Meteor.loginWithPassword(email, password, function(error){
      if(error){
        sAlert.error("Wrong email or password!");
      } else {
        sAlert.success('Login successful!');
        Router.go("/");
      }
    });
  }
});

Template.resetpass.events({
  'submit form': function(event){
    event.preventDefault();
    var email = $('[name=email]').val();
    Meteor.call('resetPassEmail', email, ( error )=>{
      if ( error ){
        sAlert.error("This email is not yet registered.");
      }else{
        sAlert.success("Check your email!");
        Router.go("/");
      }
    });
    return;
  }
});
