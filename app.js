const cors = require("cors");
const express = require("express");
const {
  getCategories,
  getReviewById,
  getUsers,
  patchReviewById,
  getReviews,
  getComments,
} = require("./controller/controller");
const {
  handleInternalErrors,
  handleCustomErrors,
} = require("./controller/errors.controllers");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/categories", getCategories);
app.get("/api/reviews/:review_id", getReviewById);
app.get("/api/users", getUsers);
app.get("/api/reviews", getReviews);
app.get("/api/reviews/:review_id/comments", getComments);

app.patch("/api/reviews/:review_id", patchReviewById);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "invalid endpoint" });
});

app.use(handleCustomErrors);

app.use(handleInternalErrors);

module.exports = app;
