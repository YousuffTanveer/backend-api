const db = require("../db/connection");

exports.selectCategories = () => {
  let baseQuery = `SELECT * FROM categories`;

  return db.query(baseQuery).then(({ rows }) => {
    return rows;
  });
};
