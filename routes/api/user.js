const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const config = require('config');
const mongoose = require('mongoose');

//@route  get api/user
//@desc   get all user
//@access  public

router.get('/', async (req, res) => {
  try {
    //=========> filter
    const filter = req.query.filter;
    const Query = filter ? JSON.parse(filter) : {};

    //=====>> "q full text search"
    if (Query.q) {
      const regex = new RegExp(Query.q);
      let mobileNumber;
      let objectId;

      //======>  if its valid objectId and if not it will do mobile
      try {
        objectId = new mongoose.Types.ObjectId(Query.q);
      } catch (err) {
        // if its not valid id then work as mobileno
        mobileNumber = parseInt(Query.q);
      }

      Query.$or = [
        { firstname: regex },
        { lastname: regex },
        { email: regex },
        { mobilenumber: mobileNumber || undefined },
        { _id: objectId || undefined }
      ];
      delete Query.q;
    }

    //=========>  sorting
    const sort = {};
    if (req.query.sort) {
      const sortParams = JSON.parse(req.query.sort);
      const validfields = [
        'firstname',
        'lastname',
        'email',
        'id',
        'mobilenumber',
        'street'
      ];
      const field = sortParams[0].toLowerCase();
      const direction = sortParams[1].toLowerCase() === 'desc' ? -1 : 1;
      if (!validfields.includes(field)) {
        return req.status(400).json({ error: 'invalid sort' });
      }

      if (field === 'id') {
        sort._id = direction;
      }
      sort[field] = direction;
    }
    //=========> range

    const range = req.query.range;
    const [startIndex, endIndex] = range
      .replace('[', '')
      .replace(']', '')
      .split(',');

    // console.log(+endIndex - +startIndex + 1);

    const users = await User.find(Query)
      .skip(+startIndex)
      .limit(+endIndex - +startIndex + 1)
      .sort(sort);

    const total = await User.find({}).count();
    //=========> header to put into,,for react-admin
    const headers = {
      'x-Total-Count': total,
      'Content-Range': `users ${startIndex}-${endIndex}/${total}`,
      'Access-Control-Expose-Headers': 'Content-Range'
    };
    res.header(headers);
    //=====> converting  _id to id
    const userArray = [];
    users.forEach(user => {
      /// ==> converting mongoose doc into simple javascript object
      const userData = user.toObject();

      const nameObj = {
        name: `${userData.firstname} ${userData.lastname}`,
        id: userData._id,
        ...userData
      };
      userArray.push(nameObj);
    });

    res.json(userArray);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//====================POST req to create user====================>

//@route  post api/user
//@desc   create user
//@access  public

router.post(
  '/',
  [
    check('firstname', 'firstname is requierd').not().isEmpty(),
    check('lastname', 'lastname is requierd').not().isEmpty(),
    check('email', 'please include a valid email').isEmail(),
    check('mobilenumber', 'mobilenumber is requierd').isLength({
      min: 5
    }),
    check('password', 'please enter password of 6 or more letter').isLength({
      min: 6
    }),
    check('address.street', 'please enter vaild street').not().isEmpty(),
    check('address.street2', 'please enter vaild street2').not().isEmpty(),
    check('address.city', 'please enter vaild city').not().isEmpty(),
    check('address.state', 'please enter vaild state').not().isEmpty(),
    check('address.zip', 'please enter vaild zip').isLength({ min: 6 }),
    check('address.country', 'please enter vaild country').not().isEmpty(),
    check('dob', 'dob is required').not().isEmpty()
  ],
  async (req, res) => {
    {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {
        firstname,
        lastname,
        email,
        mobilenumber,
        password,
        dob,
        address: { street, street2, city, state, zip, country }
      } = req.body;

      try {
        let user = await User.findOne({ email });
        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'user already exists' }] });
        }

        user = new User({
          firstname,
          lastname,
          email,
          mobilenumber,
          password,
          dob,
          address: { street, street2, city, state, zip, country }
        });

        //====> encrpt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
          user: {
            id: user.id
          }
        };
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: 360000000 },
          (err, token) => {
            if (err) throw err;

            const userData = user.toObject();
            const nameObj = {
              name: `${userData.firstname} ${userData.lastname}`,
              id: userData._id,
              ...userData
            };

            res.json(nameObj);
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
      }
    }
  }
);

// =====================GET REQUEST TO GET ID REQUEST======================================>

//@route Get api/user/user:id
//@desc  get user by id
//@access public

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ msg: ' no user' });
    }

    const userData = user.toObject();
    const nameObj = {
      id: userData._id,
      ...userData
    };
    res.status(200).json(nameObj);
    // console.log(nameObj);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('server error');
  }
});

// =====================DELETE REQUEST======================================>

//@route  delete api/user/user:id
//@desc   delete user
//@access  private

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ msg: 'user not found' });
    }
    await user.deleteOne();
    // res.send(user);

    res.json({ msg: 'user deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// =====================PUT REQUEST======================================>
// @route  Put  api/user/:user_id
// @desc   update user
// @access  private

router.put('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const {
      firstname,
      lastname,
      mobilenumber,
      dob,
      address: { street, street2, city, state, zip, country }
    } = req.body;
    if (user) {
      //update
      await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            firstname,
            lastname,
            mobilenumber,
            dob,
            address: { street, street2, city, state, zip, country }
          }
        },

        { new: true }
      );
      // await user.save();

      const userData = user.toObject();
      const nameObj = {
        id: userData._id,
        ...userData
      };
      return res.json(nameObj);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});
module.exports = router;
