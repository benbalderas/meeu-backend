const { Router } = require('express');
const router = Router();
const { veryToken } = require('../helpers/auth');
const Exhibit = require('../models/Exhibit');
const Artworks = require('../models/Artwork');

// Get all exhibits
router.get('/', (req, res) => {
  const filter = req.query;

  Exhibit.find(filter)
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => res.status(400).json(err));
});

// Get a specific exhibit
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Exhibit.findById(id)
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => res.status(400).json(err));
});

// Create an exhibit
router.post('/create', veryToken, (req, res) => {
  const exhibit = { ...req.body };

  Exhibit.create(exhibit)
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => res.status(400).json(err));
});

// Delete exhibit
router.delete('delete/:id', veryToken, (req, res) => {
  const { id } = req.params;

  Exhibit.findByIdAndRemove(id)
    .then((exhibit) => {
      res.status(200).json({
        result: exhibit,
      });

      Artworks.deleteMany({ exhibit: { $eq: id } })
        .then((artworks) => {
          res.status(200).json({
            result: artworks,
          });
        })
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
