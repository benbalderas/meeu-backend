const { Router } = require('express');
const router = Router();
const uploader = require('../helpers/multer');
const { veryToken } = require('../helpers/auth');
const Artwork = require('../models/Artwork');

router.get('/', (req, res) => {
  const filter = req.query;

  Artwork.find(filter)
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
router.post('/create', veryToken, uploader.single('image'), (req, res) => {
  const image = req.file.path;
  const artwork = { ...req.body, image };

  Artwork.create(artwork)
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => res.status(400).json(err));
});

// Delete artwork
router.delete('delete/:id', veryToken, (req, res) => {
  const { id } = req.params;

  Artwork.findByIdAndRemove(id)
    .then((artwork) => {
      res.status(200).json({
        result: artwork,
      });
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
