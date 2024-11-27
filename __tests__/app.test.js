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

    test("status: 404 - should respond with not found when the username does not exist", () => {
      const testComment = {
          username: "IDontExist",
          body: "a comment with a username that doesn't exist",
      }
      return request(app)
          .post("/api/articles/11/comments")
          .send(testComment)
          .expect(404)
          .then(({ body }) => {
              expect(body.message).toBe("User not found")
          })
    })

    test("status: 404 - should respond with not found when article does not exist", () => {
      const testComment = {
          username: "butter_bridge",
          body: "a comment on a non-existent article",
      }
      return request(app)
          .post("/api/articles/9999/comments") 
          .send(testComment)
          .expect(404)
          .then(({ body }) => {
              expect(body.message).toBe("Article not found")
          })
    })

    test("status: 404 - should respond with not found when article_id is a non existent id", () => {
      const testComment = {
          username: "butter_bridge",
          body: "a new comment",
      }
      return request(app)
          .post("/api/articles/banana/comments")
          .send(testComment)
  })

}) 

   //tasks 8
   describe("PATCH /api/articles/:article_id", () => {
    test("status: 200 - updates the votes property of the article and responds with the updated article", () => {
      const patchData = { inc_votes: 5 };
      return request(app)
        .patch("/api/articles/1")
        .send(patchData)
        .expect(200)
        .then(({ body }) => {
          const { article } = body;
          expect(typeof article).toBe("object");
          expect(article).toMatchObject({
            article_id: 1,
            title: expect.any(String),
            body: expect.any(String),
            votes: expect.any(Number),
            author: expect.any(String),
            topic: expect.any(String),
            created_at: expect.any(String),
          });
          expect(article.votes).toBe(105); 
        });
    });
  
    test("status: 400 - bad request when inc_votes is not provided or invalid", () => {
      const invalidPatchData = {};
      return request(app)
        .patch("/api/articles/1")
        .send(invalidPatchData)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("bad request");
        });
    });
  
    test("status: 404 - responds with an error when article_id does not exist", () => {
      const patchData = { inc_votes: 5 };
      return request(app)
        .patch("/api/articles/9999") 
        .send(patchData)
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("article not found");
        });
    });
  });
  
  //task 9
  describe("DELETE /api/comments/:comment_id", () => {
    test("status: 204 - delete the given comment by comment_id", () => {
        return request(app).delete("/api/comments/1").expect(204)
    })
    test("status: 400 - responds with 'bad request' for invalid comment_id", () => {
      return request(app)
        .delete("/api/comments/not-an-id")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("bad request");
        });
    });

  })

  //task 10
  describe("GET /api/users", () => {
    test("responds with an array of user objects, each containing username, name, and avatar_url", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          const { users } = body;
          expect(Array.isArray(users)).toBe(true);
          users.forEach((user) => {
            expect(user).toEqual(
              expect.objectContaining({
                username: expect.any(String),
                name: expect.any(String),
                avatar_url: expect.any(String),
              })
            );
          });
        });
    });

    test("endpoint is available at /api/users", () => {
      return request(app).get("/api/users").expect(200);
    });
     //testing endpoint
  test("testing enpoints responds with a message", async () => {
    const response = await request(app).get("/test");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("pass!");
  });

  test("endpoint is available and responds to requests", async () => {
    await request(app).get("/api/users").expect(200);
  });

  test("responds with a 404 if the endpoint does not exist", async () => {
    const response = await request(app).get("/nonexistent-endpoint").expect(404);
    expect(response.body.msg).toBe("Endpoint not found");
  });

});

 
//task 11
describe("GET /api/articles (sorting queries)", () => {

  test("200: returns articles sorted by 'created_at' in descending order by default", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSortedBy("created_at", { descending: true });
      });
  });

  test("200: sorts articles by any valid column when sort_by is provided", () => {
    return request(app)
      .get("/api/articles?sort_by=title")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSortedBy("title", { descending: true });
      });
  });

  test("200: sorts articles in ascending order when order=asc", () => {
    return request(app)
      .get("/api/articles?order=asc")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSortedBy("created_at");
      });
  });
})

//task 12
describe("GET /api/articles (with topic query)", () => {
  test("200: filters articles by the given topic", () => {
    return request(app)
      .get("/api/articles?topic=mitch")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeInstanceOf(Array);
        articles.forEach((article) => {
          expect(article.topic).toBe("mitch");
        });
      });
  });

  test("200: responds with all articles when no topic query is provided", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeInstanceOf(Array);
        expect(articles.length).toBeGreaterThan(0);
      });
  });

  test("404: responds with an error if the topic doesn't exist", () => {
    return request(app)
      .get("/api/articles?topic=nonexistent")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Topic not found");
      });
  });
});

//task 13
describe("GET /api/articles/:article_id (comment_count)", () => {
  test("200: Responds with the article including comment_count", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article).toEqual(
          expect.objectContaining({
            author: expect.any(String),
            title: expect.any(String),
            article_id: 1,
            body: expect.any(String),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(Number), 
          })
        );
      });
  });
  
  test("404: Responds with 'Article not found' for non-existent article_id", () => {
    return request(app)
      .get("/api/articles/9999") 
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article not found");
      });
  });
})
  
}); //end of description
