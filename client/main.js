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

Router.route('/createTuple',function(){
  this.render('topbarwithback',{to: "header"});
  this.render('createTuple');
});

Template.searchbar.events({
  'click button'(event, instance) {
    $(".list-group-item").each(function(){
    var searchQuery = document.getElementById("searchTuple").value.toLowerCase();
    var title = $(this).attr("class").split(" ")[2].toLowerCase();
    if (searchQuery!=""){
      if (title.includes(searchQuery)) {
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


  //TODO: messages checking for validity of e-mail address
  //      length of pass should be > 6


  // const txtpassword = document.getElementById("password");
  // const txtemail = document.getElementById("username");
  // const btnlogin = document.getElementById("loginbtn");
  // const btnregister = document.getElementById("registerbtn");

  // //login event listener
  // btnlogin.addEventListener("click", e => {
  //   const email = txtemail.value;
  //   const pass = txtpassword.value;
  //   const auth = firebase.auth();
  //   const promise = auth.signInWithEmailAndPassword(email, pass);
  //   promise
  //     .then(user => window.location="map.html")
  //     .catch(e => console.log(e.message));
  // });

  // function addUser(user) {
  //   refUser.push({
  //     id: user.email,
  //     point: 0,
  //     group: "Daejeon",
  //     lng: 50,
  //     lat: 50
  //   });

  //   window.location="map.html"
  // }

  // //registration event listener
  // btnregister.addEventListener("click", e => {
  //   const email = txtemail.value;
  //   const pass = txtpassword.value;
  //   const auth = firebase.auth();

  //   const promise = auth.createUserWithEmailAndPassword(email, pass);
  //   promise
  //     .then(user => addUser(user))
  //     .catch(e => console.log(e.message));
  // });


