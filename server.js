const express = require('express');
const cors = require('cors')
const path = require('path');
const connectToDB = require ('./db');

//start express server
const app = express();
app.listen(process.env.PORT || 8000, () =>{
  console.log('Server is running...');
});

//connect to DB
connectToDB();

//add middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// serve static files from React app
app.use(express.static(path.join(__dirname, '/client/build')));


// add routes
app.use('/api', require('./routes/ads.routes'));
app.use('/api', require('./routes/users.routes'));
app.use('/auth', require('./routes/auth.routes'));


// at any other link, just serve react app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send({message: '404 not found...'});
})
