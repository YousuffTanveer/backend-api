const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const categories = require("../db/data/test-data/categories");

beforeEach(() => seed(testData));

afterAll(() => db.end());

describe("GET catergories /api/categories", () => {
  test("should 200, should return an array of objects", () => {
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
        expect(body).toEqual({});
      });
  });
});
