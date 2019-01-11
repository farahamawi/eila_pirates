const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const Config = require('config');

const indexRouter = require('./routes/index');

const app = express();

// connect to mongo collection "pirates"
const mongoConfig = Config.get('mongodb');
const mongodbURI = `mongodb://${mongoConfig.username}:${mongoConfig.password}@${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.name}`;
const mongoURI = process.env.MONGODB_URI || mongodbURI;
mongoose.connect(mongoURI, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

const mongoConn = () => mongoose.connection;
mongoConn();

mongoose.connection
  .on('connected', () => {
    console.log('initiate mongoose default connection');
  })
  .on('error', (err) => {
    console.log(`Error connecting to mongodb: ${err}`);
  });


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

module.exports = app;
