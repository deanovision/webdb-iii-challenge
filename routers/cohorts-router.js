const express = require("express");
const knex = require("knex");
const router = express.Router();
const knexConfigure = {
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.db3"
  },
  useNullAsDefault: true
};
const db = knex(knexConfigure);

router.get("/", (req, res) => {
  db("cohorts")
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => {
      res.status(500).json({ message: "error locating cohorts" });
    });
});

module.exports = router;
