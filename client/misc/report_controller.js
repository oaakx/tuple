
var report_title = "None";

Template.report_box.events({
  'click #reportButton':function(event){
      event.preventDefault();
      var comment = document.getElementById('report_text').value;
      sAlert.error("Reported")
      setTimeout(function(){Router.go('/')}, 1000); 

      //Sent to the developers for handling
      console.log(report_title, " reported as ", comment);
    }
});

Router.route('/report/:_title',function(){
  report_title = this.params._title;
  this.render("topnavbar", {to :"header"});
  this.render("report_box");
});


Template.report_box.helpers({
  'report_title':function(){
    return report_title;
  }
});
