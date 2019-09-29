import "./siteManager";

Meteor.startup(() => { 
  let site = new siteManager();
  
  Meteor.methods({

    getComments: function(postId,filter){
        
      let comments = site.posts[postId];
      if(!comments){ //postId doesn't exist
        return [];
      }
      if(!filter){ //empty filter string
        return comments;
      }
  
      let filterLowerCase = filter.toLowerCase(); 
      return comments.filter( comment => {
        return comment.body.toLowerCase().includes(filterLowerCase);
      });
    }
  
  });
  
});