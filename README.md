A server-client app presenting comments for post id.
The server should load comments json and serve the client app with the requested comments.

Functionality:
1. Given input of post id, display the matched comments with their ids.
2. After comments were rendered, enable filtration of comments by text.
Comments json: https://jsonplaceholder.typicode.com/comments


#######################################################

Instructions how to the run the project:
1. Install Meteor:
https://www.meteor.com/install
2. Install angular2-meteor:
https://www.npmjs.com/package/angular2-meteor 
3. Unzip project folder.
4. Open terminal from commentProj folder.
5. In the cmd type : "meteor npm install"
6. In the cmd type: 'meteor'
7. Wait until you see:"App running at: http://localhost:3000/ ..."
	7.1 If meteor gets stuck on "Starting your app":
		press ctrl+c
		type: 'meteor reset'  
		type: 'meteor'

#######################################################

Known issues:
1. There is a problem importing html/css files (any file type different from .ts) to the app.component.ts and expandText.component.ts files. 
In order to use html and css I had to place the content inside the component. It should be in separate files. 

