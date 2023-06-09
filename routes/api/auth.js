const express = require('express');
const router = express.Router();
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const ExtractJwt = require(passport - jwt).ExtractJwt;
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const config = require('config');

// @route   Get api/auth
// @desc    test route
//@access   public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('server Error');
  }
});

// @route   POST api/auth
//@access   public
router.post(
  '/',
  [
    check('email', 'please include a valid email').isEmail(),

    check('password', 'please enter password of 6 or more letter').exists()
  ],
  async (req, res) => {
    {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      try {
        let user = await User.findOne({ email });
        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'wrong credentials' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'invalid credenbtials' }] });
        }

        const payload = {
          user: {
            id: user.id
          }
        };
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: 3600000000000000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
      }
    }
  }
);

module.exports = router;
