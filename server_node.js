const express = require('express');
const jwt = require('jsonwebtoken');
const connectDB = require('./config/db');
const User = require('./models/User');
const Post = require('./models/Post');
const cors = require('cors');

// const LocalStrategy = require('passport-local').Strategy;

// const passport = require('passport');

// Passport Config
// passport.use(new LocalStrategy(User.authenticate()));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

const app = express();
app.use(cors());
console.log('start');
connectDB();

app.get('/', (req, res) => res.send('API Running'));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/post', require('./routes/api/post'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on ${PORT}`));
