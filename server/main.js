import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
	Router.route('/', function () {
  	this.render('Home');
	});
	
	Router.route('/map', function () { 
  	// render the PageTwo template
		this.layout('LayoutTwo');
  	this.render('LayoutTwo'); 
	});
});
