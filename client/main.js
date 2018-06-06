import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './header.html';
import './main.html';


Router.configure({
  layoutTemplate: 'GeneralLayout'
});

Router.route('/',function(){
  this.render('browsebar',{to: "header"});
  this.render('browsebody');
});

Router.route('/tupleDescription/:_id',function(){
  this.render('topbarwithback',{to: "header"});
  this.render('tupleDescription');

  var tupleID = this.params._id;
});

Template.tupleDescription.events({

  'submit #check_id': function(event, template){
    event.preventDefault();

    var idd = template;
    console.log(idd);
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

Router.route('/createTuple',function(){
  this.render('topbarwithback',{to: "header"});
  this.render('createTuple');
});

Template.searchbar.events({
  'click button'(event, instance) {
    $(".list-group-item").each(function(){
    var searchQuery = document.getElementById("searchTuple").value.toLowerCase();
    if (searchQuery!=""){
      if ($(this).hasClass(searchQuery)) {
        $(this).show();
      } else {
        $(this).hide();
        }
      }else{
        $(this).show();
      }
    });
  },
});

Template.createTuple.events({
  'click button'(event, instance) {
      let todayDate = new Date();
      var time = todayDate.getHours() + ":" + todayDate.getMinutes() + ":" + todayDate.getSeconds();
      let bar = "-";
      let dateOfUpload = (todayDate.getMonth() + 1).toString().concat(bar, (todayDate.getDate()).toString(), bar, (todayDate.getFullYear()).toString(), bar, time.toString());
      let title = $("#title").val();
      let description = $("#description").val();
      if (title.length>30){
        return false;
      }
      if (description == "" || title == "") {
        return;
      }

      var creator = Meteor.user().emails[0]["address"];

      Meteor.call('insertTuple', title, description, creator, [creator], ( error )=>{
        if ( error ){
          console.log( error );
        }
      });
      return;
  },
});

Template.browsebody.helpers({
  tuples(){
    return tuplesList.find().fetch();
  }
});
