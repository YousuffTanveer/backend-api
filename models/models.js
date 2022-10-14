const { query } = require("../db/connection");
const db = require("../db/connection");

exports.selectCategories = () => {
  let baseQuery = `SELECT * FROM categories`;

  return db.query(baseQuery).then(({ rows }) => {
    return rows;
  });
};

exports.selectReviewById = (review_id) => {
  return db
    .query(
      `SELECT reviews.*,
      COUNT(comments.comment_id) AS comment_count
      FROM reviews
      LEFT JOIN comments ON comments.review_id = reviews.review_id
      WHERE reviews.review_id = $1 
      GROUP BY reviews.review_id;`,
      [review_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Review not found" });
      }

      return rows[0];
    });
};

exports.selectUsers = () => {
  let baseQuery = `SELECT * FROM users`;

  return db.query(baseQuery).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Review not found" });
    }
    return rows;
  });
};

exports.updateReviewById = (review_id, votes) => {
  if (isNaN(review_id)) {
    return Promise.reject({ status: 400, msg: "Not a valid id" });
  }

  return db
    .query(
      "UPDATE reviews SET votes = (votes + $1) WHERE review_id = $2 RETURNING*",
      [votes, review_id]
    )
    .then(({ rows }) => {
      if (rows.length == 0) {
        return Promise.reject({ status: 404, msg: "Review not found" });
      } else {
        return rows[0];
      }
    });
};

exports.selectReviews = (category) => {
  let queryStr =
    "SELECT reviews.*, COUNT(comments.comment_id) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id ";
  let queryValues = [];

  if (category) {
    queryStr += " WHERE category = $1";
    queryValues.push(category);
  }

  queryStr += " GROUP BY reviews.review_id ORDER BY created_at DESC";

  return db.query(queryStr, queryValues).then(({ rows }) => {
    console.log(rows);
    return rows;
  });
};
