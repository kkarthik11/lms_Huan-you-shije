const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const TodoTask = require("./models/TodoTask");

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://deathraven:deathraven@cluster0.vgbbl.mongodb.net/node-auth';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then((result) => app.listen(process.env.PORT || 3000, () => {
        console.log("SERVER STARTED");
    }))
    .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('landingPage'));
app.get('/dashboard', requireAuth, (req, res) => res.render('dashboard'));
// app.get('/dashboard/profile', requireAuth, (req, res) => res.render('profile'));

app.use(authRoutes);