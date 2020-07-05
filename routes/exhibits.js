const { Router } = require("express");
const router = Router();
const { veryToken } = require("../helpers/auth");
const Exhibit = require("../models/Exhibit");

// Get all exhibits
router.get("/", (req, res) => {
  Exhibit.find()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => res.status(400).json(err));
});

// Get a specific exhibit
router.get("/:id", (req, res) => {
  const { id } = req.params;

  Exhibit.findById(id)
    .populate("artworks", "image title author")
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => res.status(400).json(err));
});

// Create an exhibit
router.post("/", veryToken, (req, res) => {
  const exhibit = { ...req.body };

  Exhibit.create(exhibit)
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
