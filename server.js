'use strict';
 const { PORT } = require('./config');
// const {logger} = require('./middleware/logger')
const morgan = require('morgan')
const notesRouter = require('./routes/notes.router.js');
const express = require('express');
//
 const app = express();
//  // Load array of notes
//


// INSERT EXPRESS APP CODE HERE...

//app.use(logger);
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());

// Mount router on "/api"
app.use('/api', notesRouter);


app.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');

});

app.use(function(req, res, next){
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({message: 'Not Found'});
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

// ADD STATIC SERVER HERE

app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
