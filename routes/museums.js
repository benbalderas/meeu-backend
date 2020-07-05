const { Router } = require("express");
const router = Router();
const uploader = require("../helpers/multer");
const Museum = require("../models/Museum");
const { veryToken } = require("../helpers/auth");

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
router.post("/", veryToken, uploader.single("image"), (req, res) => {
  const image = req.file.path;
  const museum = { ...req.body, admin, image };
  const { _id: admin } = req.user;

  Museum.create(museum)
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
