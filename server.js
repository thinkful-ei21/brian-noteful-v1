'use strict';
const { PORT } = require('./config');
const {logger} = require('./middleware/logger')
// Load array of notes
const data = require('./db/notes');
const data = require('./db/notes');
const simDB = require('./db/simDB');  // <<== add this
const notes = simDB.initialize(data); // <<== and this


// INSERT EXPRESS APP CODE HERE...
const express = require('express');

const app = express();
app.use(logger);
app.use(express.static('public'));
app.use(express.json());

app.put('/api/notes/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateFields = ['title', 'content'];

  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  notes.update(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
});



app.get('/api/notes', (req, res) => {
  res.json(data);
});
app.get('/api/notes/:id', (req, res)=>{
  const id = req.params.id;
  res.json(data.find(item => item.id === Number(id)));
});


app.get('/api/notes/:searchTerm',(req, res) => {
  const searchTerm = req.query.searchTerm;
  const list = data.filter(function(item){
    return item.title.includes(searchTerm);
  });
  res.json(list);
});

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
