const { Router } = require("express");
const router = Router();
const uploader = require("../helpers/multer");
const { veryToken, hasPermissions } = require("../helpers/auth");
const Museum = require("../models/Museum");

// Get all museums
router.get("/", (req, res) => {
  const filter = req.query;

  Museum.find(filter)
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => res.status(500).json(err));
});

// Get a specific museum
router.get("/:id", (req, res) => {
  const { id } = req.params;

  Museum.findById(id)
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => res.status(400).json(err));
});

// Get ADMIN single museum -- might delete later
router.get("/:id", veryToken, (req, res) => {
  const { _id: admin } = req.user;
  const { id } = req.params;

  Museum.findOne({ _id: id, admin })
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => res.status(500).json(err));
});

// Create a museum with ADMIN
router.post(
  "/",
  veryToken,
  hasPermissions(["Admin"]),
  uploader.single("image"),
  (req, res) => {
    const image = req.file.path;
    const { _id: admin } = req.user;
    const museum = { ...req.body, admin, image };

    Museum.create(museum)
      .then((result) => {
        res.status(200).json({ result });
      })
      .catch((err) => res.status(400).json(err));
  }
);

module.exports = router;
