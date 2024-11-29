# Northcoders News API

For instructions, please head over to [L2C NC News](https://l2c.northcoders.com/courses/be/nc-news).



--- 

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)

<h2><strong>Setup files</h2></strong>
(1) Added the .env.test and .env.development files.
</br>
(2) npm install and npm install express.
</br>
(3) created the controller and model files.
</br>
(4) created the correct .env.development and .env.test files with PGDATABASE=databaseName.
</br>
(5) installed superjest.
</br>
(6) wrote test to read/output the json data.
</br>

<h2><strong>create and seed database</h2></strong>
(1) type 'sudo service postgresql start' in the terminal
</br>
(2) type 'npm run setup-dbs' in the terminal to create the database
</br>
(3) type 'npm run seed' in the terminal to insert values into the tables
</br>

<h2><strong>Created listen.js file to view endpoints in POSTMAN</h2></strong>
</br>
(1) listen.js and added code to view endpoints on port 9000
</br>
(2) added "start": "node listen.js" to scripts in the package.json file 
</br>
(3) npm install npm install supertest --save-dev
</br>
(4) run 'npm start'
</br>
(5) http://localhost:9000/
</br>

<h2><strong>Created new test and error if endpoint not found in app.js</h2></strong>
(1) wrote app.get("/test") to check if endpoint working
</br>
(2) I wrote app.all("*", (req, res)) to run error if endpoint not found

<h2><strong>Task 11 tests</h2></strong>
(1) installed npm install --save-dev jest-sorted
</br>
(2) added code to package.json

  <h2><strong>Task 14</h2></strong>
  (1) I created the database instance using Supabase.
  </br>
  (2) I created a new .env. file for the production environment variable.
  </br>
  (3) I updated the connection pool.
  </br>
  (4) I updated the package.json file with "main": "listen.js".
  </br>
  (5) I seeded the online database.
  </br>
  (6) I uploaded the site using Render.
  </br>
  (7) I forgot to add /api to the url and felt like a fool!
  </br></br>

 <h2><strong>Task 16</h2></strong>
 (1) I create a new router folder and assigned the variable 'apiRouter'.
</br>
 (2) I assigned the endpoint "/api" to the variable apiRouter.
</br>
 (3) In the new api-router file, I imported the necessary router modules, including topics, articles, and users. I also initialized the router by invoking the express.Router() method. Finally, I configured each route by adding code such as apiRouter.use("/topics", topicsRouter).
</br>
 (4) I created two import functions, getUsers and getUsername, from a controller file. I then created a Router using express.Router(). The code usersRouter.get("/") handles GET requests to the base /users route (e.g., example.com/users). It uses the getUsers function to respond. 
</br>
 (5) Finally, the router is exported so it can be used in other parts of the application.
</br>
 (6) I updated bthe app.js to invoke the express express.Router() method using app.use()
</br>
</br>
Test note:
          /*
          This is a note for me to remember how to use this in the future!
          
          The new date converts the 'created at' string into a date object, additionally, the .getTime() 
          method converts the date object into a numeric timestamp. 

          toBeGreaterThanOrEqual(): This Jest matcher checks if the first comment's timestamp (most recent) 
          is greater than or equal to the last comment's timestamp (oldest). In other words, it ensures that 
          the comments are sorted in descending order, with the most recent one first. 

          The comments[0] piece of code fetches the first created_at property at the start of the array, 
          moreover, the comments[comments.length - 1] code gets the property of the last comment in the 
          comments array. 
         */