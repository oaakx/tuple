import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo'

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
        }else if(Meteor.findUserByEmail(email) != null){
          sAlert.error("This email is already registered.")
          return;
        }

        Accounts.createUser({
            email: email,
            password: password
        }, function(error) {
          if(error) {
            sAlert.error('')
          } else {
            sAlert.success('Welcome to KAIST_TUPLE!');
            Router.go("/"); //Need to enable going to the page where login_signup was triggered
          }
        });
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
            console.log(error.reason);
        } else {
            sAlert.success('Login successful!');
            Router.go("/");
        }
    });
    }
});


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
