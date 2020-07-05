const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create user
router.post("/signup", (req, res) => {
  const { password, ...userValues } = req.body;

  bcrypt.hash(password, 10).then((hashedPass) => {
    const user = { ...userValues, password: hashedPass };

    User.create(user)
      .then(() => {
        res.status(200).json({ msg: "Successfully created user" });
      })
      .catch((err) => res.status(400).json(err));
  });
});

// Ger user for login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ msg: "Email or password not sent" });

  User.findOne({ email }).then((user) => {
    if (user === null)
      return res
        .status(404)
        .json({ msg: "Email not associated with an account" });

    bcrypt.compare(password, user.password).then((match) => {
      if (match) {
        const userObject = user.toObject(); // Convert bson to json
        const { password, ...userWithoutPass } = userObject; // Take out password from object
        const token = jwt.sign({ id: user._id }, process.env.SECRET, {
          expiresIn: "1d",
        });
        res
          .cookie("token", token, {
            expires: new Date(Date.now() + 86400000),
            secure: false, // TODO: Change to try if there is SSL
            httpOnly: true,
          })
          .json({ user: userWithoutPass });
      }

      return res.status(400).json({ msg: "Incorrect password" });
    });
  });
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token").json({ msg: "Logged out" });
});

module.exports = router;
