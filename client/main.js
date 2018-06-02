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



/*  $(document).ready(function(){





    database.ref("tuples/").once("value").then(function(snapshot){
      let dbSnapshot = snapshot.val();
      let keyVal = Object.keys(dbSnapshot);
      for ( var i = 0; i < keyVal.length; i++) {
        let tuple = dbSnapshot[keyVal[i]];
        if (!tuple.title){
          return;
        }
        let html =
          '<div class = "list-group-item list-group-secondary ' + tuple.title.toLowerCase() + '">' +
            '<h5 class = "mb-1">'+ tuple.title + " " + '</h5>' +
            '<small class = "mb-4"> By: ' + tuple.creator + '</small>'+
            '<p class = "mt-2">' + tuple.description + '</p>' +
           '<a class = "mt-3 btn btn-outline-info" href = "../tupleDescription/'+ i.toString() + '" style = "font-size: 12px;"> More Description </a>'
          '</div>';
        $("#list-group-append").append(html);
      }
    });
  });*/
});

Router.route('/tupleDescription/:_id',function(){
  this.render('topbarwithback',{to: "header"});
  this.render('tupleDescription');

  var tupleID = this.params._id;
  //tuples = tuplesList.find().fetch();
  //let tuple = tuples[parseInt(tupleID)];

/*
  $(document).ready(function(){
    database.ref("tuples/").once("value").then(function(snapshot){
      let dbSnapshot = snapshot.val();
      let keyVal = Object.keys(dbSnapshot);
      let tuple = dbSnapshot[keyVal[parseInt(tupleID)]];
      if (!tuple.title){
        return;
      }else{
        $("#tuple-append").append("<h1>" + tuple.title + "</h1>");
        $("#tuple-append").append("<h2>" + tuple.creator + "</h2>");
        $("#tuple-append").append("<h3>" + tuple.description + "</h3>");
      }
    });
  });*/
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

Router.route('/fuuk',function(){
  this.render('topbarwithback',{to: "header"});
  this.render('fuuk');
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

Template.fuuk.events({
  'click button'(event, instance) {
      let todayDate = new Date();
      var time = todayDate.getHours() + ":" + todayDate.getMinutes() + ":" + todayDate.getSeconds();
      let bar = "-";
      let dateOfUpload = (todayDate.getMonth() + 1).toString().concat(bar, (todayDate.getDate()).toString(), bar, (todayDate.getFullYear()).toString(), bar, time.toString());
      let title = $("#title").val();
      let description = $("#description").val();
      //let type = $("input[name=inlineRadioOptions]:checked").val();
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
/*
      firebase.database().ref('tuples/' + dateOfUpload).set({
        title: title,
        description: description,
        creator: "Bazo",
        members: ["Bazo"]//,
        //type: type
      });*/

      return;
      //$("input[name=inlineRadioOptions]:checked").val("");
  },
});

Template.browsebody.helpers({
  tuples(){
    return tuplesList.find().fetch();
  }
});




// TODO: need to fix this somehow
Template.tupleDescription.helpers({
  tuple(){
    return tuplesList.find().fetch();
  },

  'tuple_title': function(){
      var url = location.href;
      var tuple_id = url.substring(url.indexOf("tupleDescription")+17);
      return tuplesList.find({_id: tuple_id}).fetch()[0].title;
  },
  'tuple_description': function(){
      var url = location.href;
      var tuple_id = url.substring(url.indexOf("tupleDescription")+17);
      return tuplesList.find({_id: tuple_id}).fetch()[0].description;
  },
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

Template.testcom.helpers({
    'tup_comment': function(){
        var url = location.href;
        var tuple_id = url.substring(url.indexOf("tupleDescription")+17);
        return Comments.find({tuple_id: tuple_id}).fetch();
    }
});

Template.testcom.events({
  'click button':function(event){
      event.preventDefault();
      if (!Meteor.user()) {
        alert("You need to be logged in");
        Router.go("login");
        return false;
      }
      var madeBy = Meteor.user().emails[0]["address"];
      var comment = document.getElementById('comment_text').value;
      var url = location.href;
      var tuple_id = url.substring(url.indexOf("tupleDescription")+17);
      var created_time = new Date();

      var day = created_time.getDate();
      if (day < 10){
        day = "0" + day;
      }
      var month = created_time.getMonth();
      if (month < 10){
        month = "0" + month;
      }

      var year = created_time.getFullYear().toString().substring(2);

      var hour = created_time.getHours();
      if (hour < 10){
        hour = "0" + hour;
      }

      var minutes = created_time.getMinutes();
      if (minutes < 10){
        minutes = "0" + minutes;
      }


      var time =  hour + ":"+ minutes;

      var disp_time = day+"/"+month+"/"+year+ " " + time;

      if (comment == "") {
        alert("You need to be logged in");
        return false;
      } else {
        Comments.insert({
          comment: comment,
          createdAt: disp_time,
          madeBy: madeBy,
          tuple_id: tuple_id,
        });
        document.getElementById('comment_text').value='';
        return false;
      }
    }
});

Router.route('/notification',function(){
  this.render('topnavbar',{to: "header"});
  this.render('notification');

  var userID = this.params._id;
});

Template.notification.helpers({
  'notifs': function(){
      var url = location.href;
      if (!Meteor.user()) {
        alert("You need to be logged in");
        Router.go("login");
        return false;
      }
      var user = Meteor.user().emails[0]["address"];
      return Notifications.find({user: user}).fetch();
  }
});

Template.notification.events({
  'click button':function(event){
    event.preventDefault();
    if (!Meteor.user()) {
      alert("You need to be logged in");
      Router.go("login");
      return false;
    }
    var user = Meteor.user().emails[0]["address"];
    Notifications.insert({
      title: "Sample Title",
      description: "You received a sample notification",
      type: "sample",
      read: false,
      user: user
    });
    return false;
  }
});
