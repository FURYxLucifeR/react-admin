const express = require('express');
const router = express.Router();
const cors = require('cors');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const ExtractJwt = require(passport - jwt).ExtractJwt;
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const config = require('config');

const User = require('../../models/User');

// @route   POST api/users
// @access   public
// router.post(
//   '/',
//   [
//     check('firstname', 'firstname is requierd').not().isEmpty(),
//     check('lastname', 'lastname is requierd').not().isEmpty(),
//     check('email', 'please include a valid email').isEmail(),
//     check('mobilenumber', 'mobilenumber is requierd').isLength({
//       min: 10,
//       max: 10
//     }),
//     check('password', 'please enter password of 6 or more letter').isLength({
//       min: 6
//     })
//   ],
//   async (req, res) => {
//     {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }

//       //   // passport local strategy
//       //   passport.use(
//       //     new LocalStrategy(
//       //       {
//       //         usernameField: 'email',
//       //         passwordField: 'password'
//       //       },
//       //       (email, password, done) => {
//       //         User.findOne({ email }, (err, user) => {
//       //           if (err) return done(err);
//       //           if (!user)
//       //             return done(null, false, { message: 'incorrect email' });
//       //           if (!user.validPassword(password))
//       //             return done(null, false, { message: 'incorrect password' });
//       //           return done(null, user);
//       //         });
//       //       }
//       //     )
//       //   );

//       const { firstname, lastname, email, mobilenumber, password } = req.body;
//       try {
//         let user = await User.findOne({ email });
//         if (user) {
//           return res
//             .status(400)
//             .json({ errors: [{ msg: 'user already exists' }] });
//         }

//         user = new User({
//           firstname,
//           lastname,
//           email,
//           mobilenumber,
//           password
//         });

//         // encrpt password
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(password, salt);

//         await user.save();

//         const payload = {
//           user: {
//             id: user.id
//           }
//         };
//         jwt.sign(
//           payload,
//           config.get('jwtSecret'),
//           { expiresIn: 360000000 },
//           (err, token) => {
//             if (err) throw err;
//             res.json({ token });
//           }
//         );
//       } catch (err) {
//         console.error(err.message);
//         res.status(500).send('server error');
//       }
//     }
//   }
// );

module.exports = router;
