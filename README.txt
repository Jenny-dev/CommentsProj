###########
Instructions how to run project

1. Install Meteor:
https://www.meteor.com/install
2. Install angular2-meteor:
https://www.npmjs.com/package/angular2-meteor 
3. Unzip project folder.
4. Open terminal from commentProj folder.
5. In the cmd type : "meteor npm install"
6. in the cmd type: 'meteor'
7. Wait untill you see:"App running at: http://localhost:3000/ ..."
	7.1 If meteor gets stuck on "Starting your app":
		press ctrl+c
		type: 'meteor reset'  
		type: 'meteor'

######################################################

Known issues:
1. There is a problem importing html/css files (any file type different from .ts) to the app.component.ts and expandText.component.ts files 
and I didn't have time to fix it. 
In order to use html and css I had to place the content inside the component. It should be in separate files. 

######################################################
