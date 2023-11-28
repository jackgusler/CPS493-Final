const express = require("express");
const {
  getAll,
  get,
  search,
  create,
  update,
  remove,
  seed,
} = require("../models/posts");
const router = express.Router();

router
  .get("/", (req, res, next) => {
    getAll()
      .then((posts) => {
        res.send(posts);
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
      .then((post) => {
        if (post) {
          res.send(post);
        } else {
          res.status(404).send({ error: "Post not found" });
        }
      })
      .catch(next);
  })
  .post("/makepost", (req, res, next) => {
    create(req.body)
      .then((post) => {
        res.send(post);
      })
      .catch(next);
  })
  .patch("/:id", (req, res, next) => {
    req.body.id = +req.params.id;
    update(req.body)
      .then((post) => {
        res.send(post);
      })
      .catch(next);
  })
  .delete("/:id", (req, res, next) => {
    remove(+req.params.id)
      .then(() => {
        res.send({ message: "Post removed" });
      })
      .catch(next);
  })
  .post("/seed", (req, res, next) => {
    seed()
      .then(() => {
        res.send({ message: "Posts seeded" });
      })
      .catch(next);
  });

module.exports = router;
