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
(4) created the correct .env.development and .env.test files with PGDATABASE=databaseName
</br>
(5) installed superjest.
</br>
(6) wrote test to read/output the json data.


<h2><strong>create and seed database</h2></strong>
(1) type 'sudo service postgresql start' in the terminal
</br>
(2) type 'npm run setup-dbs' in the terminal to create the database
</br>
(3) type 'npm run seed' in the terminal to insert values into the tables

Created listen.js file to view endpoints in POSTMAN
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


<h2><strong>Created new test and error if endpoint not found in app.js</h2></strong>
(1) wrote app.get("/test") to check if endpoint working
</br>
(2) I wrote app.all("*", (req, res)) to run error if endpoint not found

<h2><strong>Task 11 tests</h2></strong>
(1) installed npm install --save-dev jest-sorted
</br>
(2) added code 'example 1' to package.json

  

<h2><strong>Tests</h2></strong>
(1) CORE: GET /api test complete
</br>
(2) GET /api/topics test completed
</br>
(3) /api/articles/:article_id completed
</br>
(4) /api/articles completed
</br>
(5) /api/articles/:article_id/comments completed
</br>
(6) POST /api/articles/:article_id/comments completed



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