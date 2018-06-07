


/* Handle request to join tuple */
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


/* Handle Tuple creation */

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
        sAlert.success('Tuple is created!', {effect: 'slide', position: 'top-right', timeout: '3000', onRouteClose: false, stack: false, offset: '50px'});
      });

      return;
  },
});


/* Retrieve the data needed for Tuple description */

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

/*  Routes */

Router.route('/tupleDescription/:_id',function(){
  this.render('topbarwithback',{to: "header"});
  this.render('tupleDescription');
  var tupleID = this.params._id;
});
