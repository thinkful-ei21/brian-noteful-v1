const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);

// GET Notes with search
notes.filter('cats', (err, list) => {
  if (err) {
    console.error(err);
  }
  console.log(list);
});

// GET Notes by ID
notes.find(1005, (err, item) => {
  if (err) {
    console.error(err);
  }
  if (item) {
    console.log(item);
  } else {
    console.log('not found');
  }
});

const stuff = {
  title:'random info',
  content:'asdfg'
};

notes.create(stuff, (err, item) => {
  if (err) {
    console.error(err);
  }
  if (item) {
    console.log(item);
  } if(stuff){
    console.log(stuff);
  }else {
    console.log('not found');
  }
});

// notes.delete(1005,(err, item) => {
//   if (err) {
//     console.error(err);
//   }
//   if (item) {
//     console.log(item);
//   }
// });
// PUT (Update) Notes by ID
const updateObj = {
  title: 'New Title',
  content: 'Blah blah blah'
};

notes.update(1005, updateObj, (err, item) => {
  if (err) {
    console.error(err);
  }
  if (item) {
    console.log(item);
  } else {
    console.log('not found');
  }
});
