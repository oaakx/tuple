
/* Tuple Search bar event handler */
Template.searchbar.events({
  'submit .myclass_seach' (event) {
    console.log("This happens");
  },

  'click button'(event, instance) {
    $(".list-group-item").each(function(){
    var searchQuery = document.getElementById("searchTuple").value.toLowerCase();
    var title = $(this).attr("class").split(" ")[2].toLowerCase();
    if (searchQuery!=""){
      if (title.includes(searchQuery)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    }else{
      $(this).show();
    }
    });
  }
});

/* Retrieve tuples to display */
Template.browsebody.helpers({
  tuples(){
    return tuplesList.find().fetch();
  }
});


/* Routes */
Router.route('/createTuple',function(){
  this.render('tuple_description_topbar',{to: "header"});
  this.render('createTuple');
});
