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
      let tupleDescription = dbSnapshot[keyVal[i]];
      let html = 
      '<div class = "list-group-item list-group-secondary ' + keyVal[i] + '">' +
        '<h5 class = "mb-1">'+ keyVal[i] + " " + '</h5>' + 
        '<p class = "mt-2">' + tupleDescription + '</p>' + 
        '<a class = "mt-3 btn btn-outline-info" href = "../map/map1.html" style = "font-size: 12px;"> More Description </a>'
      '</div>';
      $("#list-group-append").append(html);
    }
  });

  document.getElementById("searchTupleButton").onclick = function() {
  	$(".list-group-item").each(function(){
    	var searchQuery = document.getElementById("searchTuple").value;
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
  };

});
