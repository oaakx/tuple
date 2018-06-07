import { Meteor } from 'meteor/meteor';



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
    }
	});
});
