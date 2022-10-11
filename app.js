const express = require("express");
const { getCategories } = require("./controller/controller");
const {
  handleInternalErrors,
  handleCustomErrors,
} = require("./controller/errors.controllers");

const app = express();

app.use(express.json());

app.get("/api/categories", getCategories);

app.use(handleCustomErrors);

app.use(handleInternalErrors);

module.exports = app;
