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

Meteor.startup(function () {
  sAlert.config({
    effect: 'slide',
    position: 'top-right',
    timeout: 3000,
    html: false,
    onRouteClose: false,
    stack: false,
    offset: 80,
    beep: false,
    onClose: _.noop //
  });
});
