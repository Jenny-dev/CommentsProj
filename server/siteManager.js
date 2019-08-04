siteManager = function(){
    const request = require('request');
    const commentsUrl = "https://jsonplaceholder.typicode.com/comments";

    this.posts = [];
   
    request(commentsUrl, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        body.forEach(comment => {
            if(comment.id && comment.body){ //valid comment
                let postId = comment.postId;
                if(!this.posts[postId]){
                    this.posts[postId] = [];
                }
                this.posts[postId].push(comment);
            }
        })
    });

}