const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const formidable = require('express-formidable');
const uniqid = require('uniqid');

const passport = require('passport');
const session = require('express-session');

const adsRoutes = require('./routes/ads.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

const passportConfig = require('./config/passport');

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({ secret: 'anything' }));

app.use(passport.initialize());
app.use(passport.session());

app.use(formidable({ uploadDir: '/public/images/uploads/' }, [{
  event: 'fileBegin', // on every file upload...
  action: (req, res, next, name, file) => {
    const fileName = uniqid() + '.' + file.name.split('.')[1];
    file.path = __dirname + '/public/images/uploads/photo_' + fileName; // ...move the file to public/uploads with unique name
  },
},
]));


/* API ENDPOINTS */
app.use('/api', adsRoutes);
app.use('/auth', authRoutes);
app.use('/api/user', userRoutes);

/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ post: 'Not found...' });
});

// Serve static files from the React app


/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, './build')));
app.use(express.static(path.join(__dirname, './public')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, './build/index.html'));
});

/* MONGOOSE */
mongoose.connect('mongodb://localhost:27017/bulletinBoard', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on port: '+port);
});