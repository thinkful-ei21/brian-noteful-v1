const express = require('express');
const router = express.router();
const { PORT } = require('./config');
const {logger} = require('./middleware/logger')
const morgan = require('morgan')

 // Load array of notes


const data = require('./db/notes');
const simDB = require('./db/simDB');  // <<== add this
 const notes = simDB.initialize(data);

router.get('/api/notes', (req, res, next) => {
  const { searchTerm } = req.query;

  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err); // goes to error handler
    }
    res.json(list); // responds with filtered array
  });
});

router.get('/notes', (req, res, next) => {
  const { searchTerm } = req.query;

  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err);
    }
    res.json(list);
  });
});

router.get('/api/notes/:id', (req, res)=>{
  const id = req.params.id;
notes.find(1005, (err, item) => {
  if (err){
    return next(err)
  }
  res.json(data.find(item => item.id === Number(id)));
  });
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

router.put('/notes/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateableFields = ['title', 'content'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  /***** Never trust users - validate input *****/
  if (!updateObj.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }


// Post (insert) an item
router.post('/notes', (req, res, next) => {
  const { title, content } = req.body;

  const newItem = { title, content };
  /***** Never trust users - validate input *****/
  if (!newItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  notes.create(newItem, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
    } else {
      next();
    }
  });
});

// Delete an item
router.delete('/notes/:id', (req, res, next) => {
 const id = req.params.id;

 notes.delete(id, (err) => {
   if (err) {
     return next(err);
   }
   res.sendStatus(204);
 });
});

module.exports = router;
