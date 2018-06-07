import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './auth.html';
import { Mongo } from 'meteor/mongo'

//Comments functionality here




//REGISTER AND LOGIN FUNCTIONALITY HERE



Template.friends_list.helpers({
    'my_friends': function(){

        var friend_left = Meteor.user().emails[0]["address"];
        // console.log(friend_left);
        return Friends.find({friend_left: friend_left}).fetch();;
    }
});


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
