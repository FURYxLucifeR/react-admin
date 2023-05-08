const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  discription: {
    type: String,
    required: true
  },
  createdate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('post', PostSchema);
