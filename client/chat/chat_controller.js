/* Routes */
Router.route('/chat_list',function(){
  this.render('topnavbar',{to: "header"});
  this.render('chat_list');
});


var chat_partner = "Error"
var myself = "Error"

Template.chat_list.helpers({
    'friend_chats': function(){
        var cur_user = Meteor.user().emails[0]["address"];
        return Friends.find({friend_left: cur_user}).fetch();
    }
});




Template.chat_room_view.helpers({
    'chat_partner': function(){
        return chat_partner;
    },

    'text_messages': function() {
    	return ChatTexts.find({friend_left: my_email, friend_right: chat_partner}).fetch();
    }

});



Router.route('/chatroom/:_left/:_right',function(){
  // this.render('tuple_description_topbar',{to: "header"});
  // this.render('tupleDescription');
  var my_email = this.params._left;
  var friend_email = this.params._right;
  chat_partner = friend_email;
  myself = my_email;
  this.render('topnavbar',{to: "header"});
  this.render('chat_room_view');




	Meteor.call('is_valid_friend_email', my_email, friend_email, function(error, result) {
	    if (error) {
	        document.getElementById("add_friend_result_message").innerHTML = "An error occurred while sending friend request. Please try again.";
	    } else {
	        if (my_email != result) {
	        } else {
	            Router.go("/chat_list");
	        }
	    }
	});


	
});


function render_chatroom() {
	console.log("hat room");
	Router.render('chat_room_view');
}
