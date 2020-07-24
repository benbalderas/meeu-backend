require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(`Connected to Mongo. DB name: ${x.connections[0].name}`);
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

const app = express();

app.use(
  cors({
    origin: ['http://localhost:3001', 'https://www.meeu.app/'],
    credentials: true,
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const usersRouter = require('./routes/users');
const artworksRouter = require('./routes/artworks');
const exhibitsRouter = require('./routes/exhibits');
const museumsRouter = require('./routes/museums');

app.use('/api/user', usersRouter);
app.use('/api/artworks', artworksRouter);
app.use('/api/exhibits', exhibitsRouter);
app.use('/api/museums', museumsRouter);

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;
