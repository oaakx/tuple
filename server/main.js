import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'


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

	Meteor.methods({
		insertTuple( title, description, creator, members){
			tuplesList.insert({
        		title: title,
        		description: description,
        		creator: creator,
        		members: members//,
        		//type: type
      		});
		},
		updateTuple( title, guest){
      console.log("BRO");
			var tuple = tuplesList.find({title: title}).fetch()[0];
    		var members = tuple.members;
   			members.push(guest);
    		tuple.members = members;
    		tuplesList.update({title: title}, tuple);
		},
    removeNotification( description,title ){
      Notifications.remove({description: description, title:title});
    },

    is_valid_friend_email(my_email, friend_email){
      var result = Accounts.findUserByEmail(friend_email);

      if (result) { 
        return result.emails[0].address;
      }

      return my_email;

    }


	});
});
