import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './header.html';
import './main.html';

var config = {
  apiKey: "AIzaSyCvXSpqkE4psy1qrS1-F2P3xcJjzySSRt0",
  authDomain: "kaisttuple.firebaseapp.com",
  databaseURL: "https://kaisttuple.firebaseio.com",
};

firebase.initializeApp(config);
var database = firebase.database();

Router.configure({
  layoutTemplate: 'GeneralLayout'
});

Router.route('/',function(){
  this.render('browsebar',{to: "header"});
  this.render('browsebody');
  $(document).ready(function(){
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
  });
});

Router.route('/tupleDescription/:_id',function(){
  this.render('topbarwithback',{to: "header"});
  this.render('tupleDescription');

  var tupleID = this.params._id;
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
  });
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
      console.log(title.length);
      console.log(description.length);
      if (title.length>30){
        return false;
      }
      if (description == "" || title == "") {
        return;
      }
      firebase.database().ref('tuples/' + dateOfUpload).set({
        title: title,
        description: description,
        creator: "Bazo",
        members: ["Bazo"]//,
        //type: type
      });


      return;
      //$("input[name=inlineRadioOptions]:checked").val("");
  },
});



var config = {
apiKey: "AIzaSyCvXSpqkE4psy1qrS1-F2P3xcJjzySSRt0",
authDomain: "kaisttuple.firebaseapp.com",
databaseURL: "https://kaisttuple.firebaseio.com",
projectId: "kaisttuple",
storageBucket: "kaisttuple.appspot.com",
messagingSenderId: "623663672969"
};
firebase.initializeApp(config);


var database = firebase.database();
var refUser = database.ref("users");

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
