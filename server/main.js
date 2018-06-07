import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'


Meteor.startup(() => {
  // code to run on server at startup;
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
			var tuple = tuplesList.find({title: title}).fetch()[0];
    		var members = tuple.members;
   			members.push(guest);
    		tuple.members = members;
    		tuplesList.update({title: title}, tuple);
		},
    removeNotification( description,title ){
      Notifications.remove({description: description, title:title});
    },

		resetPassEmail(email){
			var user = Accounts.findUserByEmail(email);
			Accounts.sendResetPasswordEmail(user);
		},

		registeredEmail(email){
			if(Accounts.findUserByEmail(email) == null)
				throw new Meteor.Error();
			else {
				return email;
			}
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
