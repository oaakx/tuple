
/* Display the appropriate commentbox based on tuple id */

Template.commentbox.helpers({
    'tup_comment': function(){
        var url = location.href;
        var tuple_id = url.substring(url.indexOf("tupleDescription")+17); //not cool to have 17 here :D
        return Comments.find({tuple_id: tuple_id}).fetch();
    }
});


/* Upon submission of a comment checks whether user is logged in
  if the comment is empty or not if everything is okay, then comment is added
*/

Template.commentbox.events({
  'click button':function(event){
      event.preventDefault();
      if (!Meteor.user()) {
        sAlert.error("You need to be logged in.");
        Router.go("login");
        return false;
      }
      var madeBy = Meteor.user().emails[0]["address"];
      var comment = document.getElementById('comment_text').value;
      var url = location.href;
      var tuple_id = url.substring(url.indexOf("tupleDescription")+17);
      var created_time = new Date();

      var day = created_time.getDate();
      if (day < 10){
        day = "0" + day;
      }
      var month = created_time.getMonth();
      if (month < 10){
        month = "0" + month;
      }

      var year = created_time.getFullYear().toString().substring(2);

      var hour = created_time.getHours();
      if (hour < 10){
        hour = "0" + hour;
      }

      var minutes = created_time.getMinutes();
      if (minutes < 10){
        minutes = "0" + minutes;
      }


      var time =  hour + ":"+ minutes;

      var disp_time = day+"/"+month+"/"+year+ " " + time;

      if (comment == "") {
        sAlert.error("You need to be logged in comm");
        return false;
      } else {
        Comments.insert({
          comment: comment,
          createdAt: disp_time,
          madeBy: madeBy,
          tuple_id: tuple_id,
        });
        document.getElementById('comment_text').value='';
        return false;
      }
    }
});
