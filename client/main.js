import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
/*
Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(5);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});*/

Router.route('/', function () {
  this.render('Home');
});

Router.route('/fuuk');

$(document).ready(function(){
  var config = {
    apiKey: "AIzaSyCvXSpqkE4psy1qrS1-F2P3xcJjzySSRt0",
    authDomain: "kaisttuple.firebaseapp.com",
    databaseURL: "https://kaisttuple.firebaseio.com",
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  database.ref("tuples/").once("value").then(function(snapshot){
  	let dbSnapshot = snapshot.val();
    let keyVal = Object.keys(dbSnapshot);
    for ( var i = 0; i < keyVal.length; i++) {
      let tuple = dbSnapshot[keyVal[i]];
      if (!tuple.title){
        return;
      }
      console.log(tuple);
      let html =
      '<div class = "list-group-item list-group-secondary ' + tuple.title.toLowerCase() + '">' +
        '<h5 class = "mb-1">'+ tuple.title + " " + '</h5>' +
        '<small class = "mb-4"> By: ' + tuple.creator + '</small>'+
        '<p class = "mt-2">' + tuple.description + '</p>' +
        '<a class = "mt-3 btn btn-outline-info" href = "../fuuk" style = "font-size: 12px;"> More Description </a>'
      '</div>';
      $("#list-group-append").append(html);
    }
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

  Template.home.events({
    'click plusButton': function(e) {
        let todayDate = new Date();
        var time = todayDate.getHours() + ":" + todayDate.getMinutes() + ":" + todayDate.getSeconds();
        let bar = "-";
        let dateOfUpload = (todayDate.getMonth() + 1).toString().concat(bar, (todayDate.getDate()).toString(), bar, (todayDate.getFullYear()).toString(), bar, time.toString());
        let title = $("#title").val();
        let description = $("#description").val();
        let type = $("input[name=inlineRadioOptions]:checked").val();
        if (description == "" || title == "") {
          return;
        }
        firebase.database().ref('tuples/' + dateOfUpload).set({
          title: title,
          description: description,
          creator: "Bazo",
          members: ["Bazo"],
          type: type
        });

        $("#title").val("");
        $("#description").val("");
        $("input[name=inlineRadioOptions]:checked").val("");
    },
  });

  // make plust button refer to the createTuple screen
  /*
  document.getElementById("plusButton").onclick = function() {
  	window.open('createTuple.html',"_self");
    Router.go('../fuuk');
  };*/
});
