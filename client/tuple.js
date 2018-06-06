Router.route('/tupleDescription/:_id',function(){
  this.render('topbarwithback',{to: "header"});
  this.render('tupleDescription');

  var tupleID = this.params._id;
});

Template.tupleDescription.helpers({
  tuple(){
    return tuplesList.find().fetch();
  },

  'tuple_title': function(){
      var url = location.href;
      var tuple_id = url.substring(url.indexOf("tupleDescription")+17);
      return tuplesList.find({_id: tuple_id}).fetch()[0].title;
  },
  'tuple_description': function(){
      var url = location.href;
      var tuple_id = url.substring(url.indexOf("tupleDescription")+17);
      return tuplesList.find({_id: tuple_id}).fetch()[0].description;
  },
  'button': function(){ 
      var user = Meteor.user().emails[0]["address"];
      var description = user+" wants to join your tuple.";
      var notifications = Notifications.find({description:description}).fetch();

      var url = location.href;
      var tuple_id = url.substring(url.indexOf("tupleDescription")+17);
      var title = tuplesList.find({_id: tuple_id}).fetch()[0].title;

      for (var i =0; i<notifications.length; i++){
        if (notifications[i].title==title){
          return true;
        }
      }
      return ;
  },
  'main_button': function(){ 
      var user = Meteor.user().emails[0]["address"];

      var url = location.href;
      var tuple_id = url.substring(url.indexOf("tupleDescription")+17);
      var members = tuplesList.find({_id: tuple_id}).fetch()[0].members;

      for (var i =0; i<members.length; i++){
        if (members[i]==user){
          return true;
        }
      }
      return ;
  },
});


Template.tupleDescription.events({
  'click button':function(event){
    event.preventDefault();
    if (!Meteor.user()) {
      alert("You need to be logged in");
      Router.go("login");
      return false;
    }
    var user = Meteor.user().emails[0]["address"];
    var url = location.href;
    var tuple_id = url.substring(url.indexOf("tupleDescription")+17);
    var creator = tuplesList.find({_id: tuple_id}).fetch()[0].creator;
    var title = tuplesList.find({_id: tuple_id}).fetch()[0].title;

    Notifications.insert({
      title: title,
      description: user + " wants to join your tuple.",
      type: "tuple join request",
      read: false,
      user: creator
    });
    return false;
  }
});

Template.tupleDescription.events({
  'submit #check_id': function(event, template){
    event.preventDefault();

    var idd = template;
    console.log(idd);
  }
});

Template.createTuple.events({
  'click button'(event, instance) {
      let todayDate = new Date();
      var time = todayDate.getHours() + ":" + todayDate.getMinutes() + ":" + todayDate.getSeconds();
      let bar = "-";
      let dateOfUpload = (todayDate.getMonth() + 1).toString().concat(bar, (todayDate.getDate()).toString(), bar, (todayDate.getFullYear()).toString(), bar, time.toString());
      let title = $("#title").val();
      let description = $("#description").val();
      if (title.length>30){
        return false;
      }
      if (description == "" || title == "") {
        return;
      }

      var creator = Meteor.user().emails[0]["address"];

      Meteor.call('insertTuple', title, description, creator, [creator], ( error )=>{
        if ( error ){
          console.log( error );
        }
      });
      return;
  },
});

Template.commentbox.helpers({
    'tup_comment': function(){
        var url = location.href;
        var tuple_id = url.substring(url.indexOf("tupleDescription")+17);
        return Comments.find({tuple_id: tuple_id}).fetch();
    }
});

Template.commentbox.events({
  'click button':function(event){
      event.preventDefault();
      if (!Meteor.user()) {
        alert("You need to be logged in");
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
        alert("You need to be logged in");
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
