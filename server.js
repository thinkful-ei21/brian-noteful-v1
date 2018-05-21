'use strict';

// Load array of notes
const data = require('./db/notes');

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
const express = require('express');

const app = express();
app.use(express.static('public'));
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

// ADD STATIC SERVER HERE

app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
