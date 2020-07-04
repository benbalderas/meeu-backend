const { Router } = require("express");
const router = Router();
const uploader = require("../helpers/multer");
const Museum = require("../models/Museum");

// Get all museums
router.get("/", (req, res) => {
  Museum.find()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => res.status(500).json(err));
});

// Get a specific museum
router.get("/:id", (req, res) => {
  const { id } = req.params;

  Museum.findById(id)
    .populate("exhibits", "title type")
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => res.status(400).json(err));
});

// Create a museum
router.post("/", uploader.single("image"), (req, res) => {
  // Upload single image, for multiple images use Uploader.array and map the file paths to an "images" array
  const image = req.file.path;
  const museum = { ...req.body, image };

  Museum.create(museum)
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
