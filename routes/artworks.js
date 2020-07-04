const { Router } = require("express");
const router = Router();
const Artwork = require("../models/Artwork");
const Uploader = require("../helpers/multer");

// Get all artworks
// TODO: Get artworks only from a certain exhibit
router.get("/", (req, res) => {
  Artwork.find()
    .then((result) => {
      res.status.json({ result });
    })
    .catch((err) => res.status(400).json(err));
});

// Get a specific artwork
router.get("/:id", (req, res) => {
  const { id } = req.params;

  Artwork.find()
    .then((result) => {
      res.status.json({ result });
    })
    .catch((err) => res.status(400).json(err));
});

// Create an arwork
router.post("/", Uploader.array("images"), (req, res) => {
  // Build an array of strings with the file paths
  const images = req.files.map((file) => file.path);
  const artwork = { ...req.body, images };

  Artwork.create(artwork)
    .then((result) => {
      res.status.json({ result });
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
