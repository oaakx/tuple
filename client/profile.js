import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './auth.html';
import { Mongo } from 'meteor/mongo'

//Comments functionality here




//REGISTER AND LOGIN FUNCTIONALITY HERE

Router.route('/profile/friends_list', {
  name: 'friends_list',
  template: 'friends_list'
});


Template.friends_list.helpers({
    'my_friends': function(){
        
        var friend_left = Meteor.user().emails[0]["address"];
        // console.log(friend_left);
        return Friends.find({friend_left: friend_left}).fetch();;
    }
});

Template.friends_list.events({
    'click .unfriend_btn': function(event){
        event.preventDefault();
        event.target.innerHTML = "Unfriended";
        event.target.disabled = true;

        var friend_left = Meteor.user().emails[0]["address"];

        // var friend_right = $(this).closest("tr").html();
        var friend_right = event.target.closest("tr").childNodes[1].innerHTML.trim();
            
        console.log("Removing ", friend_left, "--", friend_right);
        setTimeout(function() {
            var connection_to_remove = Friends.findOne({friend_left: friend_left, friend_right: friend_right})._id;
            Friends.remove(connection_to_remove);    
        }, 1000)
    }
});





// Router.route('/login', {
//   name: 'login',
//   template: 'login'
// });





// Template.profile.events({
//     'click .logout': function(event){
//         event.preventDefault();
//         Meteor.logout();
//         Router.go('profile');
//     }
// });

// Template.login.events({
//     'submit form': function(event){
//         event.preventDefault();
//         var email = $('[name=email]').val();
//         var password = $('[name=password]').val();
//     Meteor.loginWithPassword(email, password, function(error){
//         if(error){
//             console.log(error.reason);
//         } else {
//             Router.go("/");
//         }
//     });
//     }
// });
Router.route('/profile',function(){
  this.render("topnavbar",{to:"header"});
  this.render("profile");
});

Template.profile.helpers({
  'username': function(){
    return Meteor.user().emails[0]["address"];
  }
});

Router.route('/profile/mytuples',function(){
  this.render("browsebar",{to:"header"});
  this.render("mytuples");
})

Template.mytuples.helpers({
  'tuples': function(){
      var url = location.href;
      if (!Meteor.user()) {
        alert("You need to be logged in");
        Router.go("login");
        return false;
      }
      var user = Meteor.user().emails[0]["address"];
      return tuplesList.find({creator: user}).fetch();
  }
});
