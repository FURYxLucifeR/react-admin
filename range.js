module.exports = (req, res, next) => {
  res.header('Content-Range', 'users 0-10/20');
  next();
};
