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
router.get("/:id", (req, res) => {
  db("cohorts")
    .where({ id: req.params.id })
    .first()
    .then(cohort => {
      if (!cohort) {
        res.status(404).json({ message: "cohort does not exist" });
      } else {
        res.status(200).json(cohort);
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error locating cohort" });
    });
});
router.post("/", (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ message: "bad request name required" });
  } else {
    db("cohorts")
      .insert(req.body)
      .then(id => {
        // res.status(201).json(id);
        db("cohorts")
          .where({ id: id[0] })
          .first()
          .then(cohort => {
            res.status(201).json(cohort);
          });
      })
      .catch(err => {
        res.status(500).json({ message: "error adding new cohort" });
      });
  }
});
router.put("/:id", (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ message: "bad request name is required" });
  } else {
    db("cohorts")
      .where({ id: req.params.id })
      .update(req.body)
      .then(count => {
        if (!count) {
          res.status(404).json({ message: "cohort(s) does not exist" });
        } else {
          res.status(200).json({ message: `${count} cohort(s) updated ` });
        }
      })
      .catch(err => {
        res.status(500).json({ message: "error updating cohort" });
      });
  }
});
router.delete("/:id", (req, res) => {
  db("cohorts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (!count) {
        res.status(404).json({ message: "cohort(s) does not exist" });
      } else {
        res.status(200).json({ message: `${count} cohort(s) deleted` });
      }
    });
});
router.get("/:id/students", (req, res) => {
  db.from("cohorts")
    .innerJoin("students", "cohorts.id", "students.cohorts_id")
    // this output reads as select * from cohorts innerJoin students on cohorts.id = students.cohorts_id
    .where({ cohorts_id: req.params.id })
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "error finding students for given cohort" });
    });
});

module.exports = router;
