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

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });

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

 /*  test("404: Responds with an error if the article_id does not exist", () => {
    return request(app)
      .get("/api/articles/212") 
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article not found");
      });
  }); */

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


}); //end of description
