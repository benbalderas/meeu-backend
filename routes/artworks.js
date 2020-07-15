const { Router } = require('express');
const router = Router();
const uploader = require('../helpers/multer');
const { veryToken } = require('../helpers/auth');
const Artwork = require('../models/Artwork');

// Get all artworks
// TODO: Get artworks only from a certain exhibit
router.get('/', (req, res) => {
  Artwork.find()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => res.status(400).json(err));
});

// Get a specific artwork
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Artwork.findById(id)
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => res.status(400).json(err));
});

// Create an arwork
router.post('/', veryToken, uploader.single('image'), (req, res) => {
  // Upload single image, for multiple images use Uploader.array and map the file paths to an "images" array
  const image = req.file.path;
  const artwork = { ...req.body, image };

  Artwork.create(artwork)
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
