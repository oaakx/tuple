Router.route('/profile',function(){
  this.render("topnavbar",{to:"header"});
  this.render("profile");
});

Template.profile.helpers({
  'username': function(){
    return Meteor.user().emails[0]["address"];
  }
});

Router.route('/mytuples',function(){
  this.render("browsebar",{to:"header"});
  this.render("mytuples");
})

Template.mytuples.helpers({
  'tuples': function(){
      var url = location.href;
      if (!Meteor.user()) {
        alert("You need to be logged in");
        Router.go("login");
        return false;
      }
      var user = Meteor.user().emails[0]["address"];
      return tuplesList.find({creator: user}).fetch();
  }
});
