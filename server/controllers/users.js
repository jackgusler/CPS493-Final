const express = require("express");
const {
  getAll,
  get,
  search,
  create,
  update,
  remove,
  login,
  register,
} = require("../models/users");
const router = express.Router();

router
  .get("/", (req, res, next) => {
    getAll()
      .then((users) => {
        res.send(users);
      })
      .catch(next);
  })
  .get("/search", (req, res, next) => {
    search(req.query.q)
      .then((results) => {
        res.send(results);
      })
      .catch(next);
  })
  .get("/:id", (req, res, next) => {
    get(+req.params.id)
      .then((user) => {
        if (user) {
          res.send(user);
        } else {
          res.status(404).send({ error: "User not found" });
        }
      })
      .catch(next);
  })
  .post("/signup", (req, res, next) => {
    create(req.body)
      .then((user) => {
        res.send(user);
      })
      .catch(next);
  })
  .post("/register", (req, res, next) => {
    register(req.body)
      .then((user) => {
        res.send(user);
      })
      .catch(next);
  })
  .post("/login", (req, res, next) => {
    login(req.body.email, req.body.password)
      .then((user) => {
        res.send(user);
      })
      .catch(next);
  })
  .patch("/:id", (req, res, next) => {
    update(req.body)
      .then((user) => {
        res.send(user);
      })
      .catch(next);
  })
  .delete("/:id", (req, res, next) => {
    remove(+req.params.id)
      .then(() => {
        res.send({ message: "User removed" });
      })
      .catch(next);
  });

module.exports = router;
