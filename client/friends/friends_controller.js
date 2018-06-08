
/* Unfriend a friend from the friends list event handler*/
Template.friends_list.events({
    'click .unfriend_btn': function(event){
        event.preventDefault();
        event.target.innerHTML = "Unfriended";
        event.target.disabled = true;

        var friend_left = Meteor.user().emails[0]["address"];
        var friend_right = event.target.closest("tr").childNodes[1].innerHTML.trim();

        console.log("Removing ", friend_left, "--", friend_right);
        
        setTimeout(function() {
            var connection_to_remove1 = Friends.findOne({friend_left: friend_left, friend_right: friend_right})._id;
            var connection_to_remove2 = Friends.findOne({friend_left: friend_right, friend_right: friend_left})._id;
            Friends.remove(connection_to_remove1);
            Friends.remove(connection_to_remove2);
            console.log("removing ", connection_to_remove1);
            console.log("removing ", connection_to_remove2);
        }, 1000)
    }
});

/* Add new friend by e-mail event handler */

Template.add_friend.events({
    'submit form': function(event){
        event.preventDefault();
        var friend_email = $('[name=friend_email]').val();
        var my_email = Meteor.user().emails[0].address;
        Meteor.call('is_valid_friend_email', my_email, friend_email, function(error, result) {
            if (error) {
                document.getElementById("add_friend_result_message").innerHTML = "An error occurred while sending friend request. Please try again.";
            }else {
                //if I get my_email back, it means the email does not exist or trying to add yourself
                if (my_email != result) {
                    console.log("whe?");
                    send_friend_request_notification(my_email, result);
                    document.getElementById("add_friend_result_message").style.color = "green";
                    document.getElementById("add_friend_result_message").innerHTML = "Friend Request Sent.";

                } else {
                    document.getElementById("add_friend_result_message").innerHTML = "Invalid email address.";
                }
            }
        });
    }
});

/* Fetch friends from the database */

Template.friends_list.helpers({
    'my_friends': function(){
        var friend_left = Meteor.user().emails[0]["address"];
        return Friends.find({friend_left: friend_left}).fetch();;
    }
});




/* Routes */

Router.route('/profile/friends_list', function() {
  this.render("friends_list_navbar",{to:"header"});
  this.render("friends_list");
});


Router.route('/profile/add_friend', function() {
  this.render("add_friend_navbar",{to:"header"});
  this.render("add_friend");
});


/* Helper functions */

/* Notify user about friend request and allow him/her to accept or reject it */
function send_friend_request_notification(user, potential_friend) {
    
    Notifications.insert({
        title: "Friend Request",
        description: user + " wants to add you as a friend.",
        type: "friend_request",
        read: false,
        user: potential_friend
    });
    console.log("notification sent", user, potential_friend);

}


/* Upon acceptance of friend request this function creates friends pairs into Database */
function add_friends_pair(friend_left, friend_right) {
    Friends.insert({friend_left: friend_left, friend_right: friend_right});
    Friends.insert({friend_left: friend_right, friend_right: friend_left});
    console.log(friend_left , " and ", friend_right, " are now friends");
}
    













