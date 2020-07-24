const { Router } = require('express');
const router = Router();
const uploader = require('../helpers/multer');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create user
router.post('/signup', (req, res) => {
  const { password, ...userValues } = req.body;

  bcrypt.hash(password, 10).then((hashedPass) => {
    const user = { ...userValues, password: hashedPass };

    User.create(user)
      .then(() => {
        res.status(200).json({ msg: 'Successfully created user' });
      })
      .catch((err) => res.status(400).json(err));
  });
});

// Ger user for login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ msg: 'Email or password not sent' });

  User.findOne({ email }).then((user) => {
    if (user === null)
      return res
        .status(404)
        .json({ msg: 'Email not associated with an account' });

    bcrypt.compare(password, user.password).then((match) => {
      if (match) {
        const userObject = user.toObject(); // Convert bson to json
        const { password, ...userWithoutPass } = userObject; // Take out password from object
        const token = jwt.sign({ id: user._id }, process.env.SECRET, {
          expiresIn: '1d',
        });
        res
          .cookie('token', token, {
            expires: new Date(Date.now() + 86400000),
            secure: false, // TODO: Change to try if there is SSL
            httpOnly: true,
          })
          .json({ user: userWithoutPass });
      }

      return res.status(400).json({ msg: 'Incorrect password' });
    });
  });
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token').json({ msg: 'Logged out' });
});

// Update
router.post('/update/:id', uploader.single('avatar'), (req, res) => {
  const { id } = req.params;
  const avatar = req.file ? req.file.path : null;
  const user = avatar ? { ...req.body, avatar } : { ...req.body };

  User.findByIdAndUpdate(id, user, { new: true })
    .then((user) => {
      res.status(200).json({
        result: user,
      });
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
