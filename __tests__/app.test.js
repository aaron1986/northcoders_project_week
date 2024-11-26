const endpointsJson = require("../endpoints.json");
const app = require('../app.js');
const request = require('supertest');
const data = require("../db/data/test-data")
const db = require('../db/connection.js');
const seed = require('../db/seeds/seed.js');
/* Set up your test imports here */

/* Set up your beforeEach & afterAll functions here */
beforeEach(() => seed(data))

afterAll(() => db.end());

//task 2 test
describe("All GET /api Tests", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });

  //task 3 test
  test("200: Responds with an array of topic objects with 'slug' and 'description' properties", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const { topics } = body;
        expect(topics).toBeInstanceOf(Array);
        expect(topics).toHaveLength(3);
        topics.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });

    });

    //task 4 tests
    test("GET article by Id: /api/articles/:article_id", () => {
      return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({body}) => {
        const {article} = body
        expect(article).toEqual(
          expect.objectContaining({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            body: expect.any(String),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
          })
        );
      });
  });

 test("404: Responds with an error if the article_id does not exist", () => {
    return request(app)
      .get("/api/articles/212") 
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article not found");
      });
  }); 

  //task 5 test
  test("200: Responds with an array of article objects", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
  
        expect(articles).toBeInstanceOf(Array);
        expect(articles.length).toBeGreaterThan(0);
  
        articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(Number),
            })
          );
        });
      });
  });

  //task 6 tests
    test("200: Responds with an array of comments for the given article_id, sorted by most recent", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;
    
          expect(comments).toBeInstanceOf(Array);
          expect(comments.length).toBeGreaterThan(0);
    
          comments.forEach((comment) => {
            expect(comment).toEqual(
              expect.objectContaining({
                comment_id: expect.any(Number),
                votes: expect.any(Number),
                created_at: expect.any(String),
                author: expect.any(String),
                body: expect.any(String),
                article_id: expect.any(Number),
              })
            );
          });
          expect(new Date(comments[0].created_at).getTime()).toBeGreaterThanOrEqual(
            new Date(comments[comments.length - 1].created_at).getTime()
          );
          /*
          Please see README.md file for explanation of line 129 code. 
          */
        });
    });
 

  test("404: Responds with an error when given a non-existent article_id", () => {
    return request(app)
      .get("/api/articles/2121/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No comments found for this article");
      });
  });

  //POST TEST
  //task 7
  describe("POST /api/articles/:article_id/comments", () => {
    test("status: 201 - should respond with the posted comment", () => {
        const testComment = {
            username: "butter_bridge",
            body: "a new comment",
        }
        return request(app)
            .post("/api/articles/11/comments")
            .send(testComment)
            .expect(201)
            .then(({ body }) => {
                const { comment } = body

                expect(typeof comment).toBe("object")
                expect(Object.keys(comment)).toHaveLength(6)
                expect(comment).toMatchObject({
                    comment_id: 19,
                    body: expect.any(String),
                    article_id: expect.any(Number),
                    author: expect.any(String),
                    votes: expect.any(Number),
                    created_at: expect.any(String),
                })
            })
      })

      test("status: 400 - should respond with an error if username is missing", () => {
        const testComment = {
            body: "a comment without a username",
        }
        return request(app)
            .post("/api/articles/11/comments")
            .send(testComment)
            .expect(400)
            .then(({ body }) => {
                expect(body.message).toBe("Username is required")
            })
    })
   
  })// end of POST test description 

 
  
}); //end of description
