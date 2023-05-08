const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Post = require('../../models/Post');

//==================> get All post
router.get('/', async (req, res) => {
  try {
    //=========> filter
    const filter = req.query.filter;
    const Query = filter ? JSON.parse(filter) : {};
    //=========> full-text search
    if (Query.q) {
      const regex = new RegExp(Query.q, 'i');
      let objectId;

      if (mongoose.Types.ObjectId.isValid(Query.q)) {
        objectId = new mongoose.Types.ObjectId(Query.q);
      }

      Query.$or = [
        { title: regex },
        { discription: regex },
        { user: objectId || undefined },
        { name: regex }
      ];

      delete Query.q;
    }

    //=========>  sorting
    const sort = {};
    if (req.query.sort) {
      const sortParams = JSON.parse(req.query.sort);
      const validfields = ['title', 'discription', 'user._id', 'name'];
      const field = sortParams[0].toLowerCase();
      const direction = sortParams[1].toLowerCase() === 'desc' ? -1 : 1;
      if (!validfields.includes(field)) {
        return res.status(400).json({ error: 'invalid sort' });
      }

      if (field === 'user._id') {
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

    const Allpost = await Post.find(Query)
      .sort(sort)
      .skip(+startIndex)
      .limit(+endIndex - +startIndex + 1)
      .populate('user', 'firstname lastname _id')
      .select('');
    //==========> headers
    const total = await Post.find().count();
    const headers = {
      'x-Total-Count': total,
      'Content-Range': `posts ${startIndex}-${endIndex}/${total}`,
      'Access-Control-Expose-Headers': 'Content-Range'
    };
    res.header(headers);

    //=====> converting  _id to id
    const userArray = [];
    Allpost.forEach(user => {
      /// ==> converting mongoose doc into simple javascript object
      const userData = user.toObject();
      const nameObj = {
        id: userData._id,
        name: `${userData.user.firstname} ${userData.user.lastname}`,
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
//========================> create Post
router.post(
  '/',
  [
    check('title', 'title is required').not().isEmpty(),
    check('discription', 'discription is required').not().isEmpty(),
    check('user', 'user is required').not().notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newPost = new Post({
        title: req.body.title,
        discription: req.body.discription,
        user: req.body.user
      });

      await newPost.save();
      const userData = newPost.toObject();
      const nameObj = {
        id: userData._id,
        ...userData
      };

      res.json(nameObj);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);

//==========> delete a post by id
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ msg: 'post not found' });
    }
    await post.deleteOne();

    res.json({ msg: 'post deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//========> get post by id
router.get('/:id', async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id).populate(
      'user',
      'firstname lastname'
    );
    if (!posts) {
      return res.status(400).json({ msg: 'no post' });
    }
    const userData = posts.toObject();
    const nameObj = {
      id: userData._id,
      name: `${userData.user.firstname} ${userData.user.lastname}`,

      ...userData
    };
    res.status(200).json(nameObj);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const Posts = await Post.findById(req.params.id);
    const { title, discription } = req.body;
    if (Posts) {
      //update
      await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            title,
            discription
          }
        },

        { new: true }
      );
      const userData = Posts.toObject();
      const nameObj = {
        id: userData._id,
        ...userData
      };
      res.status(200).json(nameObj);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

module.exports = router;
