const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const categories = require("../db/data/test-data/categories");
const users = require("../db/data/test-data/users");

beforeEach(() => seed(testData));

afterAll(() => db.end());

describe("GET catergories /api/categories", () => {
  test("should 200, should return an array of objects with a slug and description key", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ categories: body }) => {
        categories.forEach((category) => {
          expect(category).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
  test("should 404, should return err when passed invalid path", () => {
    return request(app)
      .get("/api/xxx")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid endpoint");
      });
  });
});

describe("GET /api/reviews/:review_id", () => {
  test("Should respond with only the comments that match the id", () => {
    return request(app)
      .get("/api/reviews/1")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({
          review: {
            title: "Agricola",
            designer: "Uwe Rosenberg",
            owner: "mallionaire",
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            review_body: "Farmyard fun!",
            category: "euro game",
            created_at: "2021-01-18T10:00:20.514Z",
            votes: 1,
            review_id: 1,
          },
        });
      });
  });
  test("Should return correct key types of object", () => {
    return request(app)
      .get("/api/reviews/3")
      .expect(200)
      .then(({ body }) => {
        expect(body.review).toEqual(
          expect.objectContaining({
            title: expect.any(String),
            designer: expect.any(String),
            owner: expect.any(String),
            review_id: expect.any(Number),
            review_img_url: expect.any(String),
            review_body: expect.any(String),
            category: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
          })
        );
      });
  });
  test("Should return review not found if id not valid", () => {
    return request(app)
      .get("/api/reviews/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Review not found");
      });
  });
});

describe("GET /api/users", () => {
  test("should return 200, an array of objects with username name and avatar_url properties", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ users: body }) => {
        users.forEach((users) => {
          expect(users).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            })
          );
        });
      });
  });
});

describe("PATCH /api/review/:review_id ", () => {
  test("Status 200: Should respond with an object of the updates review and status 200", () => {
    return request(app)
      .patch("/api/reviews/2")
      .send({ votes: 100 })
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({
          updatedReview: {
            title: "Jenga",
            designer: "Leslie Scott",
            owner: "philippaclaire9",
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            review_body: "Fiddly fun for all the family",
            category: "dexterity",
            created_at: "2021-01-18T10:01:41.251Z",
            votes: 105,
            review_id: 2,
          },
        });
      });
  });
  test("Status 200: Should respond with an object of the updates review and status 200", () => {
    return request(app)
      .patch("/api/reviews/2")
      .send({ votes: 100 })
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({
          updatedReview: {
            title: "Jenga",
            designer: "Leslie Scott",
            owner: "philippaclaire9",
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            review_body: "Fiddly fun for all the family",
            category: "dexterity",
            created_at: "2021-01-18T10:01:41.251Z",
            votes: 105,
            review_id: 2,
          },
        });
      });
  });
  test("Status 200: Should respond with an object of the updates review checking for votes to be a negative number", () => {
    return request(app)
      .patch("/api/reviews/2")
      .send({ votes: -100 })
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({
          updatedReview: {
            title: "Jenga",
            designer: "Leslie Scott",
            owner: "philippaclaire9",
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            review_body: "Fiddly fun for all the family",
            category: "dexterity",
            created_at: "2021-01-18T10:01:41.251Z",
            votes: -95,
            review_id: 2,
          },
        });
      });
  });
  test("Should return review not found if id not valid", () => {
    return request(app)
      .patch("/api/reviews/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Review not found");
      });
  });
});
