# Northcoders News API

For instructions, please head over to [L2C NC News](https://l2c.northcoders.com/courses/be/nc-news).



--- 

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)


(1) Added the .env.test and .env.development files.
(2) npm install and npm install express.
(3) created the controller and model files.
(4) created the correct .env.development and .env.test files with PGDATABASE=databaseName
(5) installed superjest.
(6) wrote test to read/output the json data.


create and seed database
(1) type 'sudo service postgresql start' in the terminal
(2) type 'npm run setup-dbs' in the terminal to create the database
(3) type 'npm run seed' in the terminal to insert values into the tables

Tests
(1) CORE: GET /api test complete

(2) GET /api/topics test completed

(3) /api/articles/:article_id completed

(4) /api/articles completed

(5) /api/articles/:article_id/comments completed

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